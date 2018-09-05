<template>
  <div id="app">
    <ConfigPage v-if="!boardShowing" @show-board="boardShowing = true"/>
    <Board
      v-if="boardShowing"
      v-bind:xSize="5"
      v-bind:ySize="6"
      v-bind:numBombs="7"/>
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
