<template>
  <div>
    <div class="row"> <span>Bomb(single click): </span><div class="cell-bomb"></div>&nbsp;&nbsp;&nbsp;<span style="padding-bottom: 20px">Flag(double click): </span><div class="cell-flag"></div> </div> 
    <br>
    <div class="board-row" v-for="(row, i) in this.board" v-bind:key="i">
        <cell :isBomb="board[i][j].getBomb()"
        v-for="(cell, j) in row" 
        v-bind:key="j"></cell>
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
</style>
