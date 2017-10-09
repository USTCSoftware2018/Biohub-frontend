<template>
  <div class="center-block" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
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
