<template>
  <div>
    <top-navbar></top-navbar>
    <div class="container">
      <ul class="nav nav-tabs nav-plugin">
        <li role="presentation" v-bind:class="{'active' : ('ABACUS' === currentPlugin)}" id="ABACUS"><a href="javascript:;"
             v-on:click="currentPlugin = 'ABACUS' ; ">ABACUS</a></li>
        <li role="presentation" v-bind:class="{'active' : ('bbkManager' === currentPlugin)}"><a href="javascript:;"
             v-on:click="currentPlugin = 'bbkManager'">Biobrick Manager</a></li>
        <li role="presentation"><a href="javascript:;">...</a></li>
      </ul>
      <component :is="currentPlugin"></component>
    </div>
  </div>
</template>

<script>
  import topNavbar from '../topNavbar.vue'
  import ABACUS from './ABACUS.vue'
  import bbkManager from './bbkManager.vue'
  export default {
    components: { topNavbar, ABACUS, bbkManager },
    data () {
      return {
        currentPlugin: 'ABACUS'
      }
    },
    methods: {
    }
  }
</script>