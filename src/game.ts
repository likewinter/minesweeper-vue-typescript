import { flatten, shuffle, take, compose } from 'lodash/fp'

export enum GridStatus {
  Pending,
  Solved,
  Failed
}

export enum CellState {
  Closed,
  Opened,
  Flagged
}

export interface Cell {
  mine: boolean
  state: CellState
  number: number
  position: CellPosition
}

export interface CellPosition {
  x: number
  y: number
}

export interface GridParams {
  width: number
  height: number
  minesQuantity: number
}

export type GridLayout = Cell[][]

export type Grid = {
  layout: GridLayout
  params: GridParams
}

export function getCellAdjacent(grid: Grid, { x, y }: CellPosition): Cell[] {
  return [
    ...(grid.layout[y - 1] || []).slice(x - 1 > 0 ? x - 1 : 0, x + 2),
    grid.layout[y][x - 1],
    grid.layout[y][x + 1],
    ...(grid.layout[y + 1] || []).slice(x - 1 > 0 ? x - 1 : 0, x + 2)
  ].filter(v => v)
}

function buildDefaultGrid(width: number, height: number): Grid {
  const layout: GridLayout = Array(height)
    .fill(null)
    .map(
      (v, y): Cell[] => {
        return Array(width)
          .fill(null)
          .map(
            (v, x): Cell => ({
              mine: false,
              state: CellState.Closed,
              number: 0,
              position: { x, y }
            })
          )
      }
    )

  return {
    layout,
    params: {
      width,
      height,
      minesQuantity: 0
    }
  }
}

function mineGrid(grid: Grid, minesNumber: number): Grid {
  compose([take(minesNumber), shuffle, flatten])(grid.layout).forEach(
    (cell: Cell) => (cell.mine = true)
  )

  return grid
}

function placeNumbersOnGrid(grid: Grid): Grid {
  flatten(grid.layout)
    .filter((cell: Cell) => !cell.mine)
    .forEach((cell: Cell) => {
      cell.number = getCellAdjacent(grid, cell.position).filter(
        (cell: Cell) => cell.mine
      ).length
    })

  return grid
}

export function buildGrid({ width, height, minesQuantity }: GridParams): Grid {
  return placeNumbersOnGrid(
    mineGrid(buildDefaultGrid(width, height), minesQuantity)
  )
}
