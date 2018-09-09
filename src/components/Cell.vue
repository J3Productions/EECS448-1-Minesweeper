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
  showBombCell = false;
  showFlagCell = false;

  @Prop() isBomb!: boolean;
  @Prop() isFlag!: boolean;
  @Prop() x!: number;
  @Prop() y!: number;
 
  public onCellFlag(){
    this.showFlagCell = true;
  }

  public onCellClick() {
    this.$emit('cell-click', {x: this.x, y: this.y});
  }

  public setBomb(state: boolean) {
    this.isBomb = state;
  }

  public setFlag(state: boolean) {
    this.isFlag = state;
  }

  public getBomb(): boolean {
    return this.isBomb;
  }

  public getFlag(): boolean {
    return this.isFlag;
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