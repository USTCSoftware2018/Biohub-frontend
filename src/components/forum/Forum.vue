<template>
  <div>
    <top-nav-bar></top-nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <page-footer></page-footer>
  </div>
</template>
<script>
  import TopNavBar from '../Common/TopNavBar.vue'
  import PageFooter from '../Common/PageFooter.vue'

  export default {
    components: {
      TopNavBar, PageFooter
    }
  }
</script>
