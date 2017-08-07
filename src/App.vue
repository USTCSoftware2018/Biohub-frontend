<template>
  <div class="center-block" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  window.jQuery = $
  export default {
    name: 'app'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  html {
    position: relative;
    min-height:100%;
  }
  body {
    margin: 0 0 150px !important;
  }

</style>

<style lang="sass">
  @import 'assets/css/style.scss';
</style>
