<template>
    <span>
        <div class="cell" v-if="!showBombCell && !showFlagCell" @click.left="onCellClick" @click.right="onCellFlag">
        </div>
        <div class="cell-bomb" v-if="showBombCell">
        </div>
        <div class="cell-flag" v-if="showFlagCell">
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

  @Prop() xcoord: any;
  @Prop() ycoord: any;
  @Prop() isBomb: any;
 
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
  background-color: green;
  border: 1px solid black;
  display: inline-block;
}
.cell-bomb {
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
}
.cell-flag {
  width: 30px;
  height: 30px;
  background-color: orange;
  border: 1px solid black;
  display: inline-block;
}
</style>