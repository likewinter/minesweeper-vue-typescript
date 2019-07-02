<template>
  <div
    class="field-cell"
    :class="cellCSSClass(cell)"
    @click="checkCell(cell)"
    @click.right.prevent="flagCell(cell)"
    @click.middle="openAdjacentCells(cell)"
  >{{ cellState(cell) }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Cell, CellState, CellPosition } from '../game'

@Component({
  props: {
    cell: Object
  }
})
export default class GridCell extends Vue {
  @Action checkCell!: ({ x, y }: CellPosition) => void
  @Action flagCell!: ({ x, y }: CellPosition) => void
  @Action openAdjacentCells!: ({ x, y }: CellPosition) => void
  @State debug!: boolean
  cell!: Cell

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

<style lang="sass" scoped>
$cell-border: 4px
$cell-border-color-1: #EEE
$cell-border-color-2: #666

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