<template>
  <div class="status">
    <div>Mines: {{ minesCounter }}</div>
    <transition name="fade">
      <p :class="messageClass" v-if="!isPending">{{ message }}</p>
    </transition>
    <div>Time: {{ timer }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { GridStatus as Status } from '../game'

@Component
export default class GridStatus extends Vue {
  @State minesCounter!: number
  @State timer!: number
  @State status!: Status

  get isIdle(): boolean {
    return this.status === Status.Idle
  }

  get isPending(): boolean {
    return this.status === Status.Pending
  }

  get message(): string {
    switch (this.status) {
      case Status.Solved:
        return 'Nailed it!'
      case Status.Failed:
        return 'Better luck next time ('
      default:
        return ''
    }
  }

  get messageClass(): string {
    if (this.status === Status.Solved) return 'solved'
    if (this.status === Status.Failed) return 'failed'

    return ''
  }
}
</script>

<style lang="sass" scoped>
.status
  display: flex
  justify-content: space-between
  font-size: 20px
  .fade-enter-active, .fade-leave-active
    transition: opacity .8s
  .fade-enter, .fade-leave-to
    opacity: 0
  p
    margin: 0
    &.solved
      color: green
    &.failed
      color: red
</style>
