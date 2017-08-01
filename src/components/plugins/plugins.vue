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
    <PageFooter></PageFooter>
  </div>
</template>

<script>
  import PageFooter from '../forum/Common/PageFooter.vue'
  import topNavbar from '../topNavbar.vue'
  import add from './add'
  export default {
    components: {
      topNavbar,
      PageFooter,
      add,
      ABACUS: function () {
        return import('./ABACUS')
      },
      bbkManager: function () {
        return import('./bbkManager')
      }
    },
    data () {
      return {
        currentPlugin: this.$route.params.plugin ? this.$route.params.plugin : 'add'
      }
    },
    mounted () {
      console.log(this.$route.params)
    },
    methods: {
    }
  }
</script>
