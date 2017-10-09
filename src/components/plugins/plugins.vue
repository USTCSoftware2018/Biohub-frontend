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
      <div class="col-md-9"  style='margin-top: 50px;'><div id='pluginSlot'></div></div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<style>
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
        pluginShow: false,
        linkUrl: ''
      }
    },
    mounted () {
      this.pluginShow = false
      var link = document.createElement('script')
      link.src = 'http://localhost:8000/plugin.js'
      this.linkUrl = link.src
      link.type = 'text/javascript'
      link.name = 'pluginFile'
      document.querySelector('#pluginSlot').appendChild(link)
      link.onload = () => {
        var PluginC = Vue.extend(window.plugin)
        var PluginI = new PluginC().$mount('#pluginSlot')
        console.log(PluginI)
        if (PluginI.name === 'ABACUS') {
          PluginI.setFile('/media/abacus_output_4d2i_jViYBME.pdb')
          PluginI.draw()
        }
      }
    },
    methods: {
    }
  }
</script>
