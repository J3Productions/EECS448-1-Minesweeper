<template>
  <div>
    <div class="board-row" v-for="(row, y) in this.board" v-bind:key="y">
        <cell
        :x="x"
        :y="y"
        :isBomb="getIsBomb(x, y)"
        :isFlag="getIsBomb(x, y)"
        @cell-click="cellClick"
        v-for="(cell, x) in row"
        :key="x"></cell>
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
  @Prop() private xSize!: any;
  @Prop() private ySize!: any;
  @Prop() private numBombs!: any;

  public created() {
    var board = this.initializeCells([], this.xSize, this.ySize);
    Object.seal(this.board);
    this.genBombs(board, this.numBombs);
    this.board = board;
  }

public recSearch(initX: number, initY: number){
  this.recHelper(initX, initY);
}

private checkAdjacent(xPos: number, yPos: number){
  let count = 0;
  if(this.board[xPos + 1][yPos + 1].getBomb){
    count = count + 1;
  }
  if(this.board[xPos][yPos + 1].getBomb){
    count = count + 1;
  }
  if(this.board[xPos + 1][yPos].getBomb){
    count = count + 1;
  }
  if(this.board[xPos - 1][yPos - 1].getBomb){
    count = count + 1;
  }
  if(this.board[xPos][yPos - 1].getBomb){
    count = count + 1;
  }
  if(this.board[xPos - 1][yPos].getBomb){
    count = count + 1;
  }
  if(this.board[xPos + 1][yPos - 1].getBomb){
    count = count + 1;
  }
  if(this.board[xPos - 1][yPos + 1].getBomb){
    count = count + 1;
  }
  if(this.board[xPos][yPos].getBomb){
    return(-1);
  }
  return(count);
}

private recHelper(xPos: number, yPos: number){

    if(xPos < 0 || xPos >= this.xSize || yPos < 0 || yPos >= this.ySize){
      return(true);//true stops recursion
    }

    let value = this.board[xPos][yPos].getValue();

    if(value > 0){
      //display value
      return(true);
    }

    else{
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
  private initializeCells(
    board: Cell[][],
    xSize: number,
    ySize: number
  ): Cell[][] {
    for (let i = 0; i < xSize; i++) {
      board.push(new Array(ySize));
      for (let j = 0; j < ySize; j++) {
        board[i][j] = new Cell();
      }
    }
    return board;
  }

  private getIsBomb(x: number, y: number) {
    return this.board[x][y].getBomb();
  }

  private getIsFlag(x: number, y: number) {
    return this.board[x][y].getFlag();
  }

  private cellClick(coord: any) {
    console.log(coord.x + " " + coord.y);
    if(this.board[coord.x][coord.y].getBomb())
      console.log('bomb');
  }

  private genBombs(board: Cell[][], numBombs: number) {
    let genBombCounter = 0;

    while (genBombCounter < numBombs) {
      const xBomb = Math.floor(Math.random() * this.xSize);
      const yBomb = Math.floor(Math.random() * this.ySize);

      if (!board[xBomb][yBomb].getBomb()) {
        board[xBomb][yBomb].setBomb(true);
        console.log(board[xBomb][yBomb].getBomb());
        console.log( xBomb + ' ' + yBomb + 'is a bomb')
        genBombCounter = genBombCounter + 1;
      }
    }
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
</style>
