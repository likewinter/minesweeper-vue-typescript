<template>
  <div class="field" ref="wrapper" :style="{height: `${height}px`}">
    <grid-row :row="row" :index="rowIndex" v-for="(row, rowIndex) in grid.layout" :key="rowIndex"></grid-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Grid } from '../game'
import GridRowComponent from './GridRow.vue'

@Component({
  props: {
    grid: Object
  },
  components: {
    GridRow: GridRowComponent
  }
})
export default class GridField extends Vue {
  grid!: Grid
  width: number = 0

  mounted() {
    this.handleWidth()
  }

  created() {
    window.addEventListener('resize', this.handleWidth)
  }

  destroyed() {
    window.removeEventListener('resize', this.handleWidth)
  }

  handleWidth() {
    this.width = (this.$refs.wrapper as HTMLElement).offsetWidth
  }

  get height(): number {
    return (
      Math.round(this.width / this.grid.params.width) * this.grid.params.height
    )
  }
}
</script>

<style lang="sass" scoped>
.field
  display: flex
  flex-direction: column
</style>
