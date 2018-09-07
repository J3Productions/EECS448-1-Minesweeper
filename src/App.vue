<template>
  <div id="app">
    <ConfigPage v-if="!boardShowing" @show-board="showBoard($event)"/>
    <Board
      v-if="boardShowing"
      v-bind:xSize="boardWidth"
      v-bind:ySize="boardHeight"
      v-bind:numBombs="boardBombs"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ConfigPage from './components/ConfigPage.vue';
import Board from './components/Board.vue';

@Component({
  components: {
    ConfigPage,
    Board,
  },
})
export default class App extends Vue {
  private boardShowing: boolean = false;
  private boardBombs: number = 0;
  private boardWidth: number = 0;
  private boardHeight: number = 0;

  showBoard($event: any){
    var vm = this;
    console.log('showing board')
    vm.boardShowing = true;
    vm.boardBombs = $event.bombs;
    vm.boardHeight = $event.height;
    vm.boardWidth = $event.width;
  }
}
</script>

<style>
@import './assets/roboto.css';
body {
  background-color: #3498db;
  color: white;
  font-family: 'Roboto', sans-serif;
}
#app {
  text-align: center;
  display: table;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 95vh;
  max-width: 100%;
  font-size: 17px;
}
</style>
