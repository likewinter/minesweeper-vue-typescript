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
  @State showField!: boolean
  cell!: Cell

  cellState(cell: Cell): string {
    switch (cell.state) {
      case CellState.Closed:
        return this.debug || this.showField
          ? cell.mine
            ? '💣'
            : cell.number
            ? `${cell.number}`
            : ''
          : ''
      case CellState.Opened:
        return cell.mine ? '💣' : cell.number ? `${cell.number}` : ''
      case CellState.Flagged:
        return '🚩'
    }
  }

  cellCSSClass(cell: Cell): string[] {
    const classes: string[] = []
    switch (cell.state) {
      case CellState.Closed:
        classes.push('field-cell-closed')
        break
      case CellState.Opened:
        classes.push('field-cell-opened')
        break
      case CellState.Flagged:
        classes.push('field-cell-flagged')
        break
    }
    classes.push(`field-cell-${cell.number}`)

    return classes
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
  font-size: 25px
  font-weight: bold
  border-left: $cell-border solid $cell-border-color-1
  border-top: $cell-border solid $cell-border-color-1
  border-bottom: $cell-border solid $cell-border-color-2
  border-right: $cell-border solid $cell-border-color-2
  &.field-cell-opened
    border: $cell-border solid #CCC
    background-color: #CCC
  &.field-cell-1
    color: blue
  &.field-cell-2
    color: green
  &.field-cell-3
    color: red
  &.field-cell-4
    color: darkblue
  &.field-cell-5
    color: brown
  &.field-cell-6
    color: darkcyan
</style>
