<template>
  <div>
    <div class="search-head">
      <form class="biohub-form" @submit.prevent="formSubmit">
        <img src="../../../assets/img/icon.png"
             class="snailicon"/>
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
    <div class="container search-result">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <search-result></search-result>
        <search-result></search-result>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import SearchResult from './SearchResult.vue'

  export default {
    data () {
      return {
        query: '',
        loading: true,
        bricks: [],
        cancel: null
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
          console.log(response.data)
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
    components: {
      SearchResult
    },
    mounted () {
      this.init()
    }
  }
</script>
