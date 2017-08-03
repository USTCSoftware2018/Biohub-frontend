<template>
  <div>
    <top-navbar></top-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import topNavbar from '../Common/topNavbar.vue'
  export default {
    components: {
      topNavbar
    }
  }
</script>
