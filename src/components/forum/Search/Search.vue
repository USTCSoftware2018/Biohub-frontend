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
        <search-result v-for="brick in bricks" :key="brick.part_name" :brick="brick"></search-result>
        <pager
          :hasNext="hasNext"
          :hasPrevious="hasPrevious"
          :nextRoute="nextRoute"
          :previousRoute="previousRoute">
        </pager>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import SearchResult from './SearchResult.vue'
  import Pager from '@/components/Common/Pager.vue'
  import { normalizedPageNum } from '@/utils/page'

  export default {
    data () {
      return {
        query: '',
        loading: true,
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
        let page = parseInt(this.$route.query.page)

        if (isNaN(page) || page <= 0) page = 1
        this.pageNum = page
        this.query = this.$route.query.q

        return {
          q: this.query,
          page
        }
      },
      load () {
        this.cancel && this.cancel()

        axios.get('/api/forum/bricks/', {
          cancelToken: new axios.CancelToken(c => {
            this.cancel = c
          }),
          params: this.getQueryParams()
        }).then(response => {
          this.cancel = null
          this.bricks = response.data.results
          this.hasNext = response.data.next !== null
          this.hasPrevious = response.data.previous !== null
          this.bricksCount = response.data.count

          return response
        }).always(response => {
          this.cancel = null
          this.pageNum = normalizedPageNum(response)
        })
      },
      init () {
        this.loading = true
        this.load()
      }
    },
    watch: {
      '$route' () {
        this.load()
      }
    },
    computed: {
      nextRoute () {
        return {
          name: 'search',
          query: {
            q: this.query,
            page: this.pageNum + 1
          }
        }
      },
      previousRoute () {
        return {
          name: 'search',
          query: {
            q: this.query,
            page: this.pageNum - 1
          }
        }
      }
    },
    components: {
      SearchResult, Pager
    },
    mounted () {
      this.init()
    }
  }
</script>
