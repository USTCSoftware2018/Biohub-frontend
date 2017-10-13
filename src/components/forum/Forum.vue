<template>
  <div>
    <top-navbar></top-navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
