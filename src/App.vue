<template>
  <div id="app">
    <grid-field :grid="grid" v-if="grid"></grid-field>
    <grid-status></grid-status>
    <grid-controls></grid-controls>
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
</style>
