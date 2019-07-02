<template>
  <div class="field-row">
    <grid-cell :cell="cell" :key="getCellIndex(cellIndex)" v-for="(cell, cellIndex) in row"></grid-cell>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Grid, Cell } from '../game'
import GridCellComponent from './GridCell.vue'

@Component({
  props: {
    row: Array,
    index: Number
  },
  components: {
    GridCell: GridCellComponent
  }
})
export default class GridRow extends Vue {
  row!: Cell[]
  index!: number

  getCellIndex(cellIndex: number): string {
    return `${this.index}-${cellIndex}`
  }
}
</script>

<style lang="sass" scoped>
.field-row
  display: flex
  height: 100%
  flex-direction: row
  justify-content: space-around
</style>
