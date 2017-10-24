<template>
  <div>
    <div class="search-head">
      <div class="container">
        <form class="biohub-form col-md-12" @submit.prevent="formSubmit">
          <img src="../../../assets/img/icon.png" class="snail-icon"/>
          <div class="form-group has-feedback" style="width: auto;">
            <input
              type="search"
              placeholder="Type what you know about the target bricks..."
              class="search-input"
              v-model="query"
              @focus="showHint=true"
              @blur="showHint=false">
            <a class="form-control-feedback"
               href="javascript:;" style="pointer-events: auto;top: .7em!important; right: 0.4em;"
               v-if="query"
               @click="query = ''">
              <i class="fa fa-times" style="font-size: 1.8em; color: #999!important;"></i>
            </a>
          </div>
          <input class="btn-search" value="Search" type="submit">
        </form>
        <div class="col-md-10 col-md-offset-1">
          <div class="alert alert-info search-hint" v-if="showHint">
            <b>Do you know?</b> You can use filters to make complex queries.
            A filter is a string like <code>type[:value]</code>, where <code>type</code> is a single character indicating the type of filter, and value is an optional parameter. Here's the available types:<br>
            <ul>
              <li><code>n:name</code> can be used to match part name. e.g. <code>n:0015</code>.</li>
              <li><code>a:author</code> can be used to match author. e.g. <code>a:john</code>.</li>
              <li><code>t:type</code> can be used to match part type. e.g. <code>t:dna</code>.</li>
              <li><code>o:ordering</code> can be used to change the ordering. Available fields for ordering: <code>uses</code>, <code>stars</code>, <code>rate_score</code>, <code>watches</code>, <code>weight</code> and <code>creation_date</code>. Additional <code>-</code> may be prepended to <code>ordering</code> to reverse the result. e.g. <code>o:-uses</code>, <code>o:rate_score</code>.</li>
              <li><code>h:</code> can be used to highlight the matched words.</li>
            </ul>
            Multiple filters can be used together, so queries like <code>bact t:dna o:-uses h:</code> or <code>a:john a:jen t:regulator</code> are all valid.
          </div>
        </div>
      </div>
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
  .pager {
    background: transparent;
  }
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
        bricksCount: 0,
        showHint: false
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
      '$route' (to) {
        if (to.name !== 'search') return
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
