<template>
  <div>
    <div class="board-row" v-for="(row, i) in this.board" v-bind:key="i">
        <cell :xcoord="i" :ycoord="j" :isBomb="board[i][j].getBomb()"
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
</style>
