<template>
  <div>
    <top-navbar></top-navbar>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>
<script>
  import topNavbar from '../Common/topNavbar.vue'
  import PageFooter from '../Common/PageFooter.vue'

  export default {
    components: {
      topNavbar, PageFooter
    }
  }
</script>
