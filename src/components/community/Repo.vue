<template>
  <top-navbar></top-navbar>
</template>

<script>
  import topNavbar from '../topNavbar.vue'
  export default {
    components: {
      topNavbar
    },
    created () {
      console.log(this.$route.params)
    }
  }
</script>