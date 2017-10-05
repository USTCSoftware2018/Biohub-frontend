<template>
  <div>
    <div class="search-head">
      <form class="biohub-form" @submit.prevent="formSubmit">
        <img src="../../../assets/img/icon.png" class="snail-icon"/>
        <div class="form-group has-feedback" style="width: auto; display: inline-block;">
          <input
            type="search"
            placeholder="Anything you interest in ..."
            class="search-input"
            v-model="query">
          <a class="form-control-feedback"
             href="javascript:;" style="pointer-events: auto;top: 3.7em; right: 0.4em;"
             v-if="query"
             @click="query = ''">
            <i class="fa fa-times" style="font-size: 1.8em; color: #999!important;"></i>
          </a>
        </div>
        <input class="btn-search" value="Search" type="submit">
      </form>
    </div>
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="stats">
          {{ bricksCount }} brick(s) found. Page {{ pageNum }} of {{ Math.ceil(bricksCount / 20) }}.
        </div>
        <brick-item v-for="brick in bricks" :key="brick.part_name" :brick="brick"></brick-item>
        <pager
          :hasNext="hasNext"
          :hasPrevious="hasPrevious"
          :pageNum="pageNum">
        </pager>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import BrickItem from '@/components/forum/Brick/BrickItem.vue'
  import PageMixin from '@/components/Common/PageMixin'

  export default {
    mixins: [PageMixin],
    data () {
      return {
        query: '',
        loading: false,
        bricks: [],
        cancel: null,
        hasNext: false,
        hasPrevious: false,
        pageNum: 0,
        bricksCount: 0
      }
    },
    methods: {
      formSubmit () {
        this.$router.push({
          name: 'search',
          query: {
            q: this.query
          }
        })
      },
      getQueryParams () {
        this.query = this.$route.query.q

        return {
          q: this.query
        }
      },
      load () {
        return this._load('/api/forum/bricks/')
      },
      processResponse (response) {
        this.bricks = response.data.results
        this.bricksCount = response.data.count
      },
      init () {
        this.load()
      }
    },
    watch: {
      '$route' () {
        this.load()
      }
    },
    components: {
      BrickItem
    },
    mounted () {
      this.init()
    }
  }
</script>
