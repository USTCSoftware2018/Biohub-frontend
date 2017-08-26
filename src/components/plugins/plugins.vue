<template>
  <div>
    <top-navbar></top-navbar>
    <div class="col-md-2">
      <ul class="nav nav-pills nav-plugin">
        <li role="presentation" v-bind:class="{'active' : ('ABACUS' === currentPlugin)}" style= "position:relative; left:1.5px;" id="ABACUS"><a href="/plugins/ABACUS">ABACUS</a></li>
        <li role="presentation" v-bind:class="{'active' : ('bbkManager' === currentPlugin)}"><a href="/plugins/bbkManager">Biobrick Manager</a></li>
        <li role="presentation"><a href="javascript:;">...</a></li>
      </ul>
    </div>
    <div class="col-md-10"></div>
    <component :is="currentPlugin"></component>
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
      document.querySelector('body').style.backgroundColor = 'rgb(32, 78, 112)'
    },
    destroyed () {
      document.querySelector('body').style.backgroundColor = 'transparent'
    },
    methods: {
    }
  }
</script>
