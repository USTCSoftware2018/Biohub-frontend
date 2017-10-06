<template>
  <div>
    <top-navbar></top-navbar>
    <div class='container'>
      <div class="col-md-3" id='pluginsList'>
        <div class="list-group">
          <a href='#' class="list-group-item" style="background-color:#eee;cursor: default; padding: 5px 0;">Plugins List</a>
          <a href='#' class="list-group-item">ABACUS</a>
          <a href='#' class="list-group-item">Biocircuit</a>
          <a href='#' class="list-group-item" style='background-color: #225378; color: white;border-color: #225378;'>Add a new plugin</a>
        </div>
      </div>
      <div class="col-md-10"><component :is="currentPlugin"></component></div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<style scoped>

</style>

<script>
  import PageFooter from '../Common/PageFooter.vue'
  import topNavbar from '../Common/topNavbar.vue'
  import add from './add'
  export default {
    components: {
      topNavbar,
      PageFooter,
      add
    },
    data () {
      return {
        currentPlugin: this.$route.params.plugin ? this.$route.params.plugin : 'add'
      }
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {
    }
  }
</script>
