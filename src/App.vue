<template>
  <div id="app">
    <ConfigPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ConfigPage from './components/ConfigPage.vue';

@Component({
  components: {
    ConfigPage,
  },
})
export default class App extends Vue {}
</script>

<style>
@import './assets/roboto.css';
body {
  background-color: #3498db;
  color: white;
  font-family: 'Roboto', sans-serif;
}
#app {
  text-align: center;
}
</style>
