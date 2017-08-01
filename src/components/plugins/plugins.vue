<template>
  <div>
    <top-navbar></top-navbar>
    <div class="container">
      <ul class="nav nav-tabs nav-plugin">
        <li role="presentation" v-bind:class="{'active' : ('ABACUS' === currentPlugin)}" id="ABACUS"><a href="/plugins/ABACUS">ABACUS</a></li>
        <li role="presentation" v-bind:class="{'active' : ('bbkManager' === currentPlugin)}"><a href="/plugins/bbkManager">Biobrick Manager</a></li>
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
  import add from './add.vue'
  export default {
    components: { topNavbar, ABACUS, bbkManager, add },
    mounted () {
      console.log(this.$route.params)
    },
    data () {
      return {
        currentPlugin: this.$route.params.plugin ? this.$route.params.plugin : 'add'
      }
    },
    methods: {
    }
  }
</script>