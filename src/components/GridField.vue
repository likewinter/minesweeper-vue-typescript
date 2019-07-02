<template>
  <div class="field" v-if="grid">
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
}
</script>

<style lang="sass" scoped>
.field
  width: 600px
  height: 600px
  margin: 0 auto
  display: flex
  flex-direction: column
</style>