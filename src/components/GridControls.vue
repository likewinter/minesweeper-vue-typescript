<template>
  <div class="controls">
    <label for="debug">
      <input type="checkbox" :value="debug" @click="toggleDebug" name="debug" /> Debug mode
    </label>
    <div class="buttons">
      <button @click="resetGame" v-if="isGameRunning">Stop game</button>
      <button @click="startGame(params)" v-else>Start game</button>
    </div>
    <select name="difficulty" v-model="chosenDifficulty">
      <option
        v-for="(difficulty, index) in difficulties"
        :key="index"
        :value="index"
      >{{ difficulty.name }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import {
  GameDifficulty,
  defaultGameDifficulties,
  GridParams,
  GridStatus
} from '../game'

@Component
export default class GridControls extends Vue {
  @Action startGame!: any
  @Action stopGame!: any
  @Action toggleDebug!: any
  @State debug!: boolean
  @State status!: GridStatus

  chosenDifficulty: number = 0
  difficulties: GameDifficulty[] = defaultGameDifficulties

  get params(): GridParams {
    return this.difficulties[this.chosenDifficulty].params
  }

  get isGameRunning(): boolean {
    return this.status === GridStatus.Pending
  }

  resetGame() {
    this.stopGame(GridStatus.Idle)
  }
}
</script>

<style scoped>
</style>