<template>
  <div>
    <div class="row" v-if="!gameOver"><span>Right click to flag</span></div>
    <br v-if="!gameOver">
    <div class="board-row" v-for="(row, y) in this.board" v-bind:key="y" v-if="!gameOver">
        <cell
        :x="x"
        :y="y"
        :value = "board[y][x].value"
        :isDisplayingValue = "board[y][x].isDisplayingValue"
        @cell-click="cellClick"
        @clickedOnBomb="gameOver = true"
        @flag="onFlag"
        v-for="(cell, x) in row"
        :key="x"></cell>
    </div>
    <div v-if="gameOver">
      <h2>Game Over</h2>
      <h6><button @click="goToMenu" class="button">Menu</button></h6>
      <h6><button @click="restartGame" class="button">Restart Game</button></h6>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Cell from "./Cell.vue";

@Component({
  components: {
    Cell
  }
})
export default class Board extends Vue {
  private board: Cell[][] = [];
  private gameOver = false;
  @Prop() private xSize!: any;
  @Prop() private ySize!: any;
  @Prop() private numBombs!: any;

  public created() {
    console.log('creating board')
    var board = this.initializeCells([], this.xSize, this.ySize);
    Object.seal(this.board);
    board = this.genBombs(board, this.numBombs);
    this.board = board;
    this.computeValues();
  }

  restartGame(){
    this.gameOver = false
    var board = this.initializeCells([], this.xSize, this.ySize);
    Object.seal(this.board);
    board = this.genBombs(board, this.numBombs);
    this.board = board;
    this.computeValues();
  }

  goToMenu(){
    this.gameOver = false
    this.$emit('goToMenu')
  }

  public recSearch(initX: number, initY: number){
    this.recHelper(initX, initY);
  }

  private checkAdjacent(xPos: number, yPos: number): number {
    let count = 0;
    if(this.isInBoard(xPos + 1, yPos + 1) && this.board[yPos + 1][xPos + 1].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos + 1, yPos) && this.board[yPos][xPos + 1].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos, yPos + 1) && this.board[yPos + 1][xPos].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos - 1, yPos - 1) && this.board[yPos - 1][xPos - 1].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos - 1, yPos) && this.board[yPos][xPos - 1].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos, yPos - 1) && this.board[yPos - 1][xPos].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos - 1, yPos + 1) && this.board[yPos + 1][xPos - 1].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos + 1, yPos - 1) && this.board[yPos - 1][xPos + 1].getBomb()){
      count = count + 1;
    }
    if(this.isInBoard(xPos, yPos) && this.board[yPos][xPos].getBomb()){
      return(-1);
    }
    return(count);
  }

  private recHelper(xPos: number, yPos: number) {
    if(xPos < 0 || xPos >= this.xSize || yPos < 0 || yPos >= this.ySize){
      return;
    }

    let value = this.board[yPos][xPos].value;
    if(value >= 0) {
      if(this.board[yPos][xPos].isFlag) {
        return;
      }
      if(value > 0 || this.board[yPos][xPos].isDisplayingValue){
        this.board[yPos][xPos].displayValue();
        return;
      }
      else{
        this.board[yPos][xPos].displayValue();
        this.recHelper(xPos + 1, yPos);
        this.recHelper(xPos - 1, yPos);
        this.recHelper(xPos, yPos + 1);
        this.recHelper(xPos, yPos - 1);
        this.recHelper(xPos + 1, yPos + 1);
        this.recHelper(xPos - 1, yPos - 1);
        this.recHelper(xPos + 1, yPos - 1);
        this.recHelper(xPos - 1, yPos + 1);
      }
    }
  }

  private initializeCells(
    board: Cell[][],
    xSize: number,
    ySize: number
  ): Cell[][] {
    for (let i = 0; i < ySize; i++) {
      board.push(new Array(ySize));
      for (let j = 0; j < xSize; j++) {
        board[i][j] = new Cell();
        board[i][j].x = j;
        board[i][j].y = i;
        board[i][j].isDisplayingValue = false;
        board[i][j].isFlag = false;
      }
    }
    return board;
  }

  private computeValues() {
    for(let i = 0; i < this.ySize; i++) {
      for(let j = 0; j < this.xSize; j++) {
        this.board[i][j].value = this.checkAdjacent(j, i);
      }
    }
  }

  private cellClick(coord: any) {
    this.recSearch(coord.x, coord.y);
  }

  private onFlag(coord: any) {
    this.board[coord.y][coord.x].isFlag = !this.board[coord.y][coord.x].isFlag;
  }

  private genBombs(board: Cell[][], numBombs: number): Cell[][] {
    let genBombCounter = 0;

    while (genBombCounter < numBombs) {
      const xBomb = Math.floor(Math.random() * this.xSize);
      const yBomb = Math.floor(Math.random() * this.ySize);

      if (!board[yBomb][xBomb].getBomb()) {
        board[yBomb][xBomb].setBomb(true);
        genBombCounter = genBombCounter + 1;
      }
    }

    return board;
  }

  private isInBoard(x: number, y: number): boolean {
    return this.board[y] !== undefined && this.board[y][x] !== undefined;
  }
}
</script>
<style scoped>
table {
  border-spacing: 10px;
}
.board-row {
  margin-bottom: -3px;
}
.cell {
  width: 15px;
  height: 15px;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
}
.cell-bomb {
  width: 15px;
  height: 15px;
  background-color: black;
  border: 1px solid white;
  display: inline-block;
}
.cell-flag {
  width: 15px;
  height: 15px;
  background-color: green;
  border: 1px solid white;
  display: inline-block;
}
.button {
    background-color: white; /* Green */
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
