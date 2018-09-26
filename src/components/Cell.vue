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

/**
 * Represents a cell in the game board
 */
@Component
export default class Cell extends Vue {
  /**
   * The x coordinate of this cell in the board
   */
  @Prop() x!: number;

  /**
   * The y coordinate of this cell in the board
   */
  @Prop() y!: number;

  /**
   * The number of bombs adjacent to this cell, or -1 if this cell is a bomb
   */
  @Prop() value!: number;

  /**
   * Indicates whether this cell should display its value (the number of adjacent bombs)
   */
  @Prop() isDisplayingValue!: boolean;

  /**
   * This holds the value of isDisplayingValue while all isDisplayingValue changes to true in cheet mode. After cheet mode, isDisplayingValue is changed back to isRevealed.
   */
  @Prop() isRevealed!: boolean;

  /**
   * Gets a value indicating whether a flag can currently be placed
   */
  @Prop() getCanFlag!: () => boolean;

  /**
   * Indicates whether this cell has been flagged by the user
   */
  isFlag: boolean = false;

  /**
   * Called when the user flags this cell. Emits the 'flag' event
   * @param {e} The event representing the click
   */
  public onCellFlag(e: any) {
    e.preventDefault();
    if(!this.isFlag && this.getCanFlag() || this.isFlag){
      this.isFlag = !this.isFlag;
      this.$emit('flag', { x: this.x, y: this.y} );
    }
  }

  /**
   * Called when the user clicks on this cell.
   * Emits the 'clickedOnBomb' event if this is a bomb, or the 'cell-click' event otherwise
   */
  public onCellClick() {
    if (this.value == -1) {
      this.$emit("clickedOnBomb");
    }
    this.$emit("cell-click", { x: this.x, y: this.y });
  }

  /**
   * Changes the bomb state of this cell (bomb or not a bomb)
   * @param {state} Indicates whether this cell should contain a bomb
   */
  public setBomb(state: boolean) {
    if (state) this.value = -1;
  }

  /**
   * Gets a value indicating whether this cell contains a bomb
   * @returns A value indicating whether this cell contains a bomb
   */
  public getBomb(): boolean {
    return this.value === -1;
  }

  /**
   * Gets a value indicating whether this cell has been flagged by the user
   * @returns A value indicating whether this cell has been flagged by the user
   */
  public getFlag(): boolean {
    return this.isFlag;
  }

  /**
   * Displays the number of adjacent bombs to this cell
   */
  public displayValue() {
    this.isDisplayingValue = true;
    this.isReavealed = true;
  }

  /**
   * Displays the information store in this cell in cheat mode.
   */
  public cheatOn() {
    this.isDisplayingValue  = true;
  }

  /**
   * Change this cell back to what it is when the cheat mode off.
   */
  public cheatOff() {
    this.isDisplayingValue  = this.isRevealed;
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
