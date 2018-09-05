<template>
  <div id="config">
    <p v-if="errorMsg">{{ errorMsg }}</p>
    <p>Width: <input v-model="width" type="number"></input></p>
    <p>Height: <input v-model="height" type="number"></input></p>
    <p>Bombs: <input v-model="bombs" type="number"></input></p>
    <p><input type="button" v-on:click="submit" value="Start Game"></input></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class ConfigPage extends Vue {
  @Prop() private msg!: string;
  private width = 0;
  private height = 0;
  private bombs = 0;

  private errorMsg = '';

  public submit() {
    this.errorMsg = this.filterRange();
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getBombs(): number {
    return this.bombs;
  }

  private filterRange(): string {
    let errorMsg = '';
    if (this.width < 2 || this.width > 50) {
      errorMsg += 'Width must be between 2 and 50';
    }
    if (this.height < 2 || this.height > 50) {
      errorMsg += '\nHeight must be between 2 and 50';
    }
    if (this.bombs < 1 || this.bombs > this.height * this.width - 1) {
      errorMsg += `\nNumber of bombs must be between 1 and ${this.height * this.width - 1}`;
    }

    if (errorMsg[0] === '\n') {
      errorMsg = errorMsg.substr(1, errorMsg.length);
    }
    return errorMsg;
  }
}
</script>
