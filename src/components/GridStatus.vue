<template>
  <div class="status">
    <div>Mines: {{ minesCounter }}</div>
    <div>Timer: {{ timer }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component
export default class GridStatus extends Vue {
  @State minesCounter!: number
  @State timer!: number
}
</script>

<style lang="sass" scoped>
.status
  display: flex
  justify-content: space-between
  font-size: 20px
</style>
