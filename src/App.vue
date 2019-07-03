<template>
  <div id="app">
    <h1>Minesweeper X9000</h1>
    <grid-status></grid-status>
    <grid-controls></grid-controls>
    <grid-field :grid="grid" v-if="grid"></grid-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Grid } from './game'
import GridFieldComponent from './components/GridField.vue'
import GridStatusComponent from './components/GridStatus.vue'
import GridControlsComponent from './components/GridControls.vue'

@Component({
  components: {
    GridField: GridFieldComponent,
    GridStatus: GridStatusComponent,
    GridControls: GridControlsComponent
  }
})
export default class App extends Vue {
  @State grid!: Grid
}
</script>

<style lang="sass">
#app
  font-family: monospace
  max-width: 900px
  @media (max-width: 800px)
    width: 600px
  @media (max-width: 600px)
    width: 400px
  margin: 0 auto
  h1
    font-size: 30px
</style>
