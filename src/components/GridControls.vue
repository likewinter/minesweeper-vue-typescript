<template>
  <div class="controls">
    <div class="main">
      <select
        name="difficulty"
        @change="changeDifficulty(difficulties[$event.target.value])"
        :disabled="isGameRunning"
      >
        <option
          v-for="(difficulty, index) in difficulties"
          :key="index"
          :value="index"
        >{{ difficulty.name }}</option>
      </select>
      <button @click="startGame" :disabled="isGameRunning">Start game</button>
    </div>
    <label for="debug">
      <input type="checkbox" :value="debug" @click="toggleDebug" name="debug" /> Debug mode
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { GameDifficulty, GridParams, GridStatus } from '../game'

@Component
export default class GridControls extends Vue {
  @Action startGame!: any
  @Action stopGame!: any
  @Action toggleDebug!: any
  @Action changeDifficulty!: (difficulty: GameDifficulty) => void
  @State debug!: boolean
  @State status!: GridStatus
  @State difficulties!: GameDifficulty[]

  get isGameRunning(): boolean {
    return this.status === GridStatus.Pending
  }

  resetGame() {
    this.stopGame(GridStatus.Idle)
  }
}
</script>

<style lang="sass" scoped>
.controls
  display: flex
  justify-content: space-between
  margin: 10px 0
  .main
    button
      font-size: 15px
      border-radius: 5px
    select
      font-size: 15px
      width: 200px
      margin-right: 10px
</style>
