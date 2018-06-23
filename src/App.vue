<template>
  <div id="app">

    <div class="io">
      <div>
        <canvas width="250" height="250  "></canvas>
      </div>
      <div>
        <h1>imogen</h1>
        <p>a colour distribution visualiser</p>
      </div>
      <div>
        <canvas width="250" height="250  "></canvas>
      </div>
    </div>

    <div class="actions">
      <div><button>undo</button></div>
      <div><button>add operation</button></div>
      <div><button>reset</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  padding-top: 1rem;
  color: rgb(251, 80, 80);

  .io {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;

    div {
      border: 1px solid red;
    }
  }
}

* {
  margin: 0;
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.actions {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 2rem;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    padding: 1rem 2rem;
    border-radius: 0.4rem;
    border: 1px solid rgb(67, 181, 226);
    background: none;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    outline: none;
    cursor: pointer;
  }
}
</style>
