<template>
    <span>
        <div class="cell" v-if="!showBombCell && !showFlagCell" @click.left="onCellClick" @click.right="onCellFlag">
            <span style="color: black">{Math.floor(Math.random() * 6) + 1  {number}}</span>
        </div>
        <div class="cell-bomb" v-if="showBombCell">
            <span style="color: black">{{number}}</span>
        </div>
        <div class="cell-flag" v-if="showFlagCell">
            <span style="color: green">{{number}}</span>
        </div>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Cell extends Vue {
  private bomb = false;
  private flag = false;
  showBombCell = false;
  showFlagCell = false;
  number = 0;

  @Prop() isBomb: any;
 

  created() {
      this.number = Math.floor(Math.random() * 5) + 1  
  }

  onCellFlag(){
    this.showFlagCell = true;
  }

  onCellClick() {
    console.log(this.isBomb);
    if (this.isBomb) {
      this.showBombCell = true;
    }
  }

  public setBomb(state: boolean) {
    this.bomb = state;
  }

  public setFlag(state: boolean) {
    this.flag = state;
  }

  public getBomb(): boolean {
    return this.bomb;
  }

  public getFlag(): boolean {
    return this.flag;
  }
}
</script>
<style scoped>
.cell {
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
}
.cell-bomb {
  width: 30px;
  height: 30px;
  background-color: black;
  border: 1px solid black;
  display: inline-block;
}
.cell-flag {
  width: 30px;
  height: 30px;
  background-color: green;
  border: 1px solid black;
  display: inline-block;
}
</style>