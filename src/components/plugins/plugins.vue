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
      <div class="col-md-9"><plugin v-if='pluginShow'></plugin></div>
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
  import Vue from 'vue'
  export default {
    components: {
      topNavbar,
      PageFooter
    },
    data () {
      return {
        pluginShow: false
      }
    },
    mounted () {
      var $ = require('jquery')
      console.log($)
      this.pluginShow = false
      var link = document.createElement('script')
      link.src = 'http://localhost:8000/plugin.min.js'
      link.type = 'text/javascript'
      document.body.appendChild(link)
      window.onload = () => {
        let plugin = window.plugin
        Vue.component('plugin', plugin)
        this.pluginShow = true
      }
    },
    destroyed () {
    },
    methods: {
    }
  }
</script>
