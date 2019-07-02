<template>
  <div class="status">Mines {{ minesCounter }}, Timer: {{ timer }}, Status: {{ status }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component
export default class GridStatus extends Vue {
  @State status!: GridStatus
  @State minesCounter!: number
  @State timer!: number
}
</script>

<style lang="sass" scoped>
</style>