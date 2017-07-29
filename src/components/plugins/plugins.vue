<template>
  <div>
    <top-navbar></top-navbar>
    <div class="pluginsNav">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active" id="ABACUS"><a href="javascript:;" v-on:click="changeView('ABACUS')">ABACUS</a></li>
        <li role="presentation" id="bbkManager"><a href="javascript:;" v-on:click="changeView('bbkManager')">Biobrick Manager</a></li>
        <li role="presentation"><a href="javascript:;">...</a></li>
      </ul>
    </div>
    <component :is="currentPlugin"></component>
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
      changeView (view) {
        this.currentPlugin = view
        document.getElementsByClassName('active')[0].classList.remove('active')
        document.getElementById(view).classList.add('active')
      }
    }
  }
</script>