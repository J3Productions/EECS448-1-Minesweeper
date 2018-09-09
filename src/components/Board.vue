<template>
  <div>
    <div class="board-row" v-for="(row, i) in this.board" v-bind:key="i">
      <cell 
        v-for="(cell, j) in row" 
        v-bind:key="j"></cell>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Cell from './Cell.vue';

@Component({
  components: {
    Cell,
  },
})
export default class Board extends Vue {
    private board: Cell[][] = [];
    @Prop(Number) private xSize!: number;
    @Prop(Number) private ySize!: number;
    @Prop(Number) private numBombs!: number;

    public created() {
        this.board = this.initializeCells(this.board, this.xSize, this.ySize);
        Object.seal(this.board);
        this.genBombs(this.numBombs);
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
      return(count);
    }

    private recHelper(xPos: number, yPos: number){

        let adjacent = this.checkAdjacent(xPos, yPos);
        if(xPos < 0 || xPos >= this.xSize || yPos < 0 || yPos >= this.ySize){
          return(0);
        }

        if(adjacent > 0){
          return(adjacent);
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



    private initializeCells(board: Cell[][], xSize: number, ySize: number): Cell[][] {
      for (let i = 0; i < xSize; i++) {
        board.push(new Array(ySize));
        for (let j = 0; j < ySize; j++) {
          board[i][j] = new Cell();
        }
      }
      return board;
    }

    private genBombs(numBombs: number) {
        let genBombCounter = 0;

        while (genBombCounter < numBombs) {

            const xBomb = Math.floor(Math.random() * this.xSize);
            const yBomb = Math.floor(Math.random() * this.ySize);

            if (!this.board[xBomb][yBomb].getBomb()) {
                this.board[xBomb][yBomb].setBomb(true);
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
