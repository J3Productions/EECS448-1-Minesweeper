<template>
  <div>
    <p id="header">Minesweeper!</p>
    <div id="config-wrapper">
      <div id="config">
        <table>
          <tr>
            <td>Player Name:</td>
            <td><input v-model="name" type="text" value="0"/></td>
          </tr>
          <tr>
            <td>Width: <span class="glyphicon glyphicon-house"></span></td>
            <td><input v-model="width" type="number" value="0" min="2" max="20"/></td>
          </tr>
          <tr>
            <td>Height:</td>
            <td><input v-model="height" type="number" value="0" min="2" max="20"/></td>
          </tr>
          <tr>
            <td>Bombs:</td>
            <td><input v-model="bombs" type="number" value="0" min="1" max="399"/></td>
          </tr>
        </table>
        <p><input type="button" @click="submit" value="Start Game"/></p>
      </div>
      <p>{{ errorMsg}}</p>
      <p>{{ heightError}}</p>
      <p>{{ widthError}}</p>
      <p>{{ bombError}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Board from 'Board.vue';

/**
 * Contains fields for collecting configuration input from the user
 */
@Component
export default class ConfigPage extends Vue {
  /**
   * The board width currently contained in the Width input
   */
  private width: number = 0;

  /**
   * The board height currently contained in the Height input
   */
  private height: number = 0;

  /**
   * The number of bombs currently contained in the Bombs input
   */
  private bombs: number = 0;
  
  /**
   * Player name. Using in score board.
   */
  private name: string = '';

  /**
   * The top-level error message shown if the user enters invalid input
   */
  private errorMsg: string = '';

  /**
   * The error message shown if the user enters an invalid height
   */
  private heightError: string = '';

  /**
   * The error message shown if the user enters an invalid width
   */
  private widthError: string = '';

  /**
   * The error message shown if the user enters an invalid number of bombs
   */
  private bombError: string = '';

  /**
   * Indicates whether the user entered invalid input
   */
  private error = false;
  
  
  
  /**
  * fill the Arrays that store the top 10 names and scores.
  */
  public createScoreName()
  {
    if(typeof(Storage) !== "undefined")
    {
      var test = JSON.parse(sessionStorage.scoreArr);
      if(test[0] > 0)
      {
        console.log("Already have score!");
      }
      else
      {
        var scoreArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var scoreStr = JSON.stringify(scoreArr);
        sessionStorage.scoreArr = scoreStr;
      
        var nameArr = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
        var nameStr = JSON.stringify(nameArr);
        sessionStorage.nameArr = nameStr;
        console.log("Score Board array created!")
      }
    }
    else
    {
      console.log("Sorry, your browser does not support we storage...");
    }
  }
  
  

  /**
   * Processes user input and emits a 'show-board' event if the input is valid
   */
  public submit() {
    this.errorMsg = this.filterRange();
    if (this.errorMsg.length === 0) {
      var obj =  {
        width: this.width,
        height: this.height,
        bombs: this.bombs,
        name: this.name
      }
      this.createScoreName();
      this.$emit('show-board', obj);
    }
  }

  /**
   * Gets the board width currently contained in the Width input
   * @throws TypeError If the current board width is invalid
   * @returns The board width currently contained in the Width input
   */
  public getWidth(): number {
    if (this.errorMsg === '') {
      return this.width;
    }
    throw new TypeError('Width is currently invalid');
  }

  /**
   * Gets the board height currently contained in the Height input
   * @throws TypeError If the current board height is invalid
   * @returns The board height currently contained in the Height input
   */
  public getHeight(): number {
    if (this.errorMsg === '') {
      return this.height;
    }
    throw new TypeError('Height is currently invalid');
  }

  /**
   * Gets the number of bombs currently contained in the Bombs input
   * @throws TypeError if the current number of bombs is invalid
   * @returns The number of bombs currently contained in the Bombs input
   */
  public getBombs(): number {
    if (this.errorMsg === '') {
      return this.bombs;
    }
    throw new TypeError('Bombs is currently invalid');
  }

  /**
   * Checks for invalid inputs from the user and sets relevant error messages if applicable
   * @returns The top-level error message if there is an input error.
   */
  private filterRange(): string {
    let invalid : string[] = [];
    this.widthError = '';
    this.heightError = '';
    this.bombError = '';

    if (this.width < 2 || this.width > 20 || this.width % 1 != 0) {
      invalid.push('Width');
      this.widthError += 'Width must be a whole number between 2 and 20';

    }
    if (this.height < 2 || this.height > 20 || this.height % 1 != 0) {
      invalid.push('Height');
      this.heightError += 'Height must be a whole number between 2 and 20';
    }
    if (this.bombs < 1) {
      invalid.push('Number of Bombs');
      this.bombError += `Number of Bombs must be greater than 1`;

    }

    else if(this.bombs > this.height * this.width - 1 && this.width > 1 && this.height > 1 || this.bombs % 1 != 0){
      invalid.push('Number of Bombs');
      let max = this.height * this.width - 1;
      this.bombError += `Number of Bombs must be a whole number between 1 and ${max}`
    }

    if(invalid.length == 1){
      return(`${invalid[0]} has invalid value.`);
    }

    if(invalid.length == 2){
      return(`${invalid[0]} and ${invalid[1]} have invalid values.`);
    }

    if(invalid.length == 3){
      return(`${invalid[0]}, ${invalid[1]}, and ${invalid[2]} have invalid values.`);      
    }

    return('');
  }
}
</script>
<style scoped>
  input[type="number"] {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: 0;
    border-bottom: 2px solid white;
    color: white;
    margin-left: 10px;
    font-size: 17px;
  }
  input:focus {
    outline: none;
  }
  input[type="button"] {
    background-color: white;
    color: black;
    border: 0;
    padding: 5px;
    font-family: 'Roboto';
    padding: 5px 20px 5px 20px;
  }
  table {
    border-spacing: 10px;
  }
  #header {
    font-size: 100px;
    margin-bottom: -10px;
  }
  #config {
    border-radius: 10px;
    width: fit-content;
    margin: auto;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
  }
</style>
