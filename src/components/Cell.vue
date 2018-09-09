<template>
    <span>
        <div class="cell unclicked unselectable" v-if="!isFlag && !isDisplayingValue" @click.left="onCellClick" @click.right="onCellFlag">
          &nbsp;
        </div>
        <div class="cell value unselectable" v-if="isDisplayingValue && value > 0">
          {{ this.value }}
        </div>
        <div class="cell no-value unselectable" v-if="isDisplayingValue && value === 0">
          &nbsp;
        </div>
        <div class="cell flag unselectable" v-if="isFlag" @click.right="onCellFlag">
          &nbsp;
        </div>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Cell extends Vue {
  @Prop() x!: number;
  @Prop() y!: number;
  @Prop() value!: number;
  @Prop() isDisplayingValue!: boolean;

  isFlag: boolean = false;

  public onCellFlag(e: any) {
    e.preventDefault();
    this.isFlag = !this.isFlag;
  }

  public onCellClick() {
    if (this.value == -1) {
      this.$emit("clickedOnBomb");
    }
    this.$emit("cell-click", { x: this.x, y: this.y });
  }

  public setBomb(state: boolean) {
    if (state) this.value = -1;
  }

  public getBomb(): boolean {
    return this.value === -1;
  }

  public getFlag(): boolean {
    return this.isFlag;
  }

  public displayValue() {
    this.isDisplayingValue = true;
  }
}
</script>
<style scoped>
.cell {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: inline-block;
  cursor: pointer;
}
.unclicked {
  background-color: green;
}
.value {
  background-color: blue;
}
.no-value {
  background-color: white;
}
.flag {
  background-color: orange;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>