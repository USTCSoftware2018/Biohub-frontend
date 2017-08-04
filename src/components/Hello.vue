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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
