<template>
  <div id="app">
    <div class="field" v-if="grid">
      <div class="field-row" v-for="(row, rowIndex) in grid.layout" :key="rowIndex">
        <div
          class="field-cell"
          :class="cellCSSClass(cell)"
          v-for="(cell, cellIndex) in row"
          :key="`${rowIndex}-${cellIndex}`"
          @click="checkCell(cell)"
          @click.right.prevent="flagCell(cell)"
          @click.middle="openAdjacentCells(cell)"
        >{{ cellState(cell) }}</div>
      </div>
    </div>
    <div class="status">Mines {{ minesCounter }}, Timer: {{ timer }}, Status: {{ status }}</div>
    <div class="options">
      <input type="checkbox" v-model="debug" /> Debug mode
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Grid, CellPosition, Cell, CellState, GridStatus } from './game'

@Component
export default class App extends Vue {
  @Action startGame!: any
  @Action checkCell!: ({ x, y }: CellPosition) => void
  @Action flagCell!: ({ x, y }: CellPosition) => void
  @Action openAdjacentCells!: ({ x, y }: CellPosition) => void
  @State grid!: Grid
  @State status!: GridStatus
  @State minesCounter!: number
  @State timer!: number

  public debug = true

  mounted() {
    this.startGame({})
  }

  cellState(cell: Cell): string {
    switch (cell.state) {
      case CellState.Closed:
        return this.debug ? (cell.mine ? '💣' : `${cell.number}`) : ''
      case CellState.Opened:
        return cell.mine ? '💣' : cell.number ? `${cell.number}` : ''
      case CellState.Flagged:
        return '🚩'
    }
  }

  cellCSSClass(cell: Cell): string {
    const classes = []
    switch (cell.state) {
      case CellState.Closed:
        return 'field-cell-closed'
      case CellState.Opened:
        return 'field-cell-opened'
      case CellState.Flagged:
        return 'field-cell-flagged'
    }
  }
}
</script>

<style lang="sass">
$cell-border: 4px
$cell-border-color-1: #EEE
$cell-border-color-2: #666
#app
  .field
    width: 600px
    height: 600px
    margin: 0 auto
    display: flex
    flex-direction: column
    .field-row
      display: flex
      height: 100%
      flex-direction: row
      justify-content: space-around
      .field-cell
        user-select: none
        cursor: pointer
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        background-color: #DDD
        color: blue
        font-size: 25px
        border-left: $cell-border solid $cell-border-color-1
        border-top: $cell-border solid $cell-border-color-1
        border-bottom: $cell-border solid $cell-border-color-2
        border-right: $cell-border solid $cell-border-color-2
        &.field-cell-opened
          border: $cell-border solid #CCC
          background-color: #CCC
</style>
