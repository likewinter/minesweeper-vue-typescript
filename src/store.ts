import Vue from 'vue'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import flatten from 'lodash/flatten'
import {
  Cell,
  CellState,
  CellPosition,
  GameDifficulty,
  Grid,
  GridStatus,
  buildGrid,
  getCellAdjacent,
  defaultGameDifficulties as difficulties
} from './game'

Vue.use(Vuex)

const difficulty = difficulties[0]

interface RootState {
  grid: Grid
  debug: boolean
  showField: boolean
  status: GridStatus
  difficulty: GameDifficulty
  difficulties: GameDifficulty[]
  minesCounter: number
  timer: number
  timerInterval: null | number
}

const state: RootState = {
  grid: buildGrid(difficulty.params),
  debug: false,
  showField: false,
  difficulty,
  difficulties,
  minesCounter: difficulty.params.minesQuantity,
  status: GridStatus.Idle,
  timer: 0,
  timerInterval: null
}

const mutations: MutationTree<RootState> = {
  setGrid(state, grid: Grid) {
    state.grid = grid
  },
  setInterval(state, value: number | null = null) {
    state.timerInterval = value
  },
  clearInterval(state) {
    state.timerInterval && clearInterval(state.timerInterval)
  },
  setDebug(state, enabled: boolean) {
    state.debug = enabled
  },
  setShowField(state, enabled: boolean) {
    state.showField = enabled
  },
  setStatus(state, status: GridStatus) {
    state.status = status
  },
  setDifficulty(state, difficulty: GameDifficulty) {
    state.difficulty = difficulty
  },
  resetTimer(state) {
    state.timer = 0
  },
  incrementTimer(state) {
    ++state.timer
  },
  setMinesCounter(state, value: number) {
    state.minesCounter = value
  },
  incrementMinesCounter(state) {
    ++state.minesCounter
  },
  decrementMinesCounter(state) {
    --state.minesCounter
  },
  openCell(state, { x, y }: CellPosition) {
    state.grid.layout[y][x].state = CellState.Opened
  },
  closeCell(state, { x, y }: CellPosition) {
    state.grid.layout[y][x].state = CellState.Closed
  },
  markCellWithFlag(state, { x, y }: CellPosition) {
    state.grid.layout[y][x].state = CellState.Flagged
  }
}

const actions: ActionTree<RootState, RootState> = {
  startTimer({ commit }) {
    commit('setInterval', setInterval(() => commit('incrementTimer'), 1000))
  },
  startGame({ commit, dispatch, state }) {
    commit('setShowField', false)
    if (state.status !== GridStatus.Idle)
      commit('setGrid', buildGrid(state.difficulty.params))
    commit('setStatus', GridStatus.Pending)
    commit('resetTimer')
    dispatch('startTimer')
  },
  stopGame({ commit }, status: GridStatus) {
    commit('setStatus', status)
    commit('setShowField', true)
    commit('clearInterval')
  },
  changeDifficulty({ state, commit }, difficulty: GameDifficulty) {
    commit('setDifficulty', difficulty)
    commit('setMinesCounter', difficulty.params.minesQuantity)
    commit('setGrid', buildGrid(difficulty.params))
  },
  toggleDebug({ state, commit }) {
    commit('setDebug', !state.debug)
  },
  сheckSolution({ state, dispatch }) {
    // If player check more cell than mined
    if (state.minesCounter < 0) return

    const unsolved = flatten(state.grid.layout)
      .filter((cell: Cell) => !cell.mine)
      .filter((cell: Cell) => cell.state !== CellState.Opened)
    if (unsolved.length > 0) return

    dispatch('stopGame', GridStatus.Solved)
  },
  flagCell({ state, commit, dispatch }, cell: Cell) {
    // Do nothing if game not in progress
    if (state.status !== GridStatus.Pending) return

    // If cell already opened do nothing
    if (cell.state === CellState.Opened) return
    // Remove flag from flagged cell
    if (cell.state === CellState.Flagged) {
      commit('closeCell', cell.position)
      commit('incrementMinesCounter')
      // Check solution
      dispatch('сheckSolution')

      return
    }
    // Mark cell with flag
    commit('markCellWithFlag', cell.position)
    commit('decrementMinesCounter')
    // Check solution
    dispatch('сheckSolution')
  },
  checkCell({ state, commit, dispatch }, cell) {
    // Do nothing if game is over
    if (
      state.status === GridStatus.Solved ||
      state.status === GridStatus.Failed
    )
      return

    // Starts game if it's not yet started
    if (state.status === GridStatus.Idle) dispatch('startGame')

    // Check if cell yet closed
    if (cell.state !== CellState.Closed) return
    // Open cell
    commit('openCell', cell.position)
    // Check if cell was mined or not and stop the game in first case
    if (cell.mine) {
      dispatch('stopGame', GridStatus.Failed)
    } else {
      if (cell.number === 0) dispatch('openAdjacentCells', cell)
      // Check solution
      dispatch('сheckSolution')
    }
  },
  openAdjacentCells({ state, commit }, cell: Cell) {
    if (cell.state !== CellState.Opened) return

    const adjacent = getCellAdjacent(state.grid, cell.position)
    const cellsToOpen: Cell[] = adjacent.filter(
      (c: Cell) => c.state !== CellState.Flagged
    )
    if (adjacent.length - cellsToOpen.length !== cell.number) return

    cellsToOpen.forEach((c: Cell) => this.dispatch('checkCell', c))
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
