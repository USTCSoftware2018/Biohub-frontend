<template>
  <div>
    <component v-if="show" is="plugin"></component>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'hello',
    mounted () {
      var link = document.createElement('script')
      link.src = 'http://localhost:8000/plugin.js'
      document.body.appendChild(link)
      window.onload = () => {
        let plugin = window.plugin
        Vue.component('plugin', plugin)
        this.show = true
      }
    },
    data () {
      return {
        msg: 'Biohub Init',
        show: false
      }
    }
  }
</script>
