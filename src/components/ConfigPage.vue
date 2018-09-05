<template>
  <div id="wrapper">
    <p id="header">Minesweeper</p>
    <div id="config-wrapper">
      <div id="config">
        <table>
          <tr>
            <td>Width:</td>
            <td><input v-model="width" type="number"></input></td>
          </tr>
          <tr>
            <td>Height:</td>
            <td><input v-model="height" type="number"></input></td>
          </tr>
          <tr>
            <td>Bombs:</td>
            <td><input v-model="bombs" type="number"></input></td>
          </tr>
        </table>
        <p><input type="button" @click="submit" value="Start Game"></input></p>
      </div>
      <p>{{ errorMsg }}</p>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Board from 'Board.vue';

@Component
export default class ConfigPage extends Vue {
  private width: number = 0;
  private height: number = 0;
  private bombs: number = 0;
  private errorMsg: string = '';
  private error = false;
  showGameBoard: boolean = false;


  public submit() {
    var vm = this;
    vm.errorMsg = vm.filterRange();
    if(vm.errorMsg.length == 0){
      console.log("Starting Game");
      vm.showGameBoard = true;
    }
  }

  public getWidth(): number {
    if (this.errorMsg === '') {
      return this.width;
    }
    throw new TypeError('Width is currently invalid');
  }

  public getHeight(): number {
    if (this.errorMsg === '') {
      return this.height;
    }
    throw new TypeError('Height is currently invalid');
  }

  public getBombs(): number {
    if (this.errorMsg === '') {
      return this.bombs;
    }
    throw new TypeError('Bombs is currently invalid');
  }

  private filterRange(): string {
    let invalid = '';
    if (this.width < 2 || this.width > 50) {
      invalid += 'width';
    }
    if (this.height < 2 || this.height > 50) {
      invalid += ', height';
    }
    if (this.bombs < 1 || this.bombs > this.height * this.width - 1) {
      invalid += ', number of bombs';
    }
    if (invalid[0] === '\n') {
      invalid = invalid.substr(1, invalid.length);
    }

    if(invalid.length > 0) {
      invalid = `${invalid[0].toUpperCase()}${invalid.substr(1)}`;
    }
    return invalid.length > 0 ? `${invalid} have invalid values.` : '';
  }
}
</script>
<style scoped>
  input[type="number"] {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: 0;
    border-bottom: 2px solid white;
    color: white;
    margin-left: 10px;
    font-size: 17px;
  }
  input:focus {
    outline: none;
  }
  input[type="button"] {
    background-color: white;
    color: black;
    border: 0;
    padding: 5px;
    font-family: 'Roboto';
    padding: 5px 20px 5px 20px;
  }
  table {
    border-spacing: 10px;
  }
  #wrapper {
    display: table;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 95vh;
    max-width: 100%;
    font-size: 17px;
  }
  #header {
    font-size: 100px;
    margin-bottom: -10px;
  }
  #config {
    border-radius: 10px;
    width: fit-content;
    margin: auto;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
  }
</style>
