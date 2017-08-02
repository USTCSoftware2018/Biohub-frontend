<template>
  <div>
    <top-navbar></top-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import TopNavbar from '../Common/topNavbar.vue'
  export default {
    components: {
      TopNavbar
    }
  }
</script>
