<template>
  <div class="container">
    <div class="row">
      <div class="center-block" id="app">
        <img src="./assets/img/brand.png" width="530px" style="padding-top: 10em;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
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
  margin-top: 60px;
}
</style>

<style lang="sass">
  @import 'assets/css/style.scss'
</style>
