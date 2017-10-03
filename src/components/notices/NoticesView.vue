<template>
  <div class="container notice-view">
    <div class="col-md-offset-2 col-md-8 notice-view-container">
      <div class="notice-list" v-if="inited">
        <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
        <ul class="pager">
          <li :class="{ disabled: !hasPrevious }">
            <router-link :to="{ name: 'notices', query: { page: pageNum - 1 } }">
              Previous
            </router-link>
          </li>
          <li :class="{ disabled: !hasNext }">
            <router-link :to="{ name: 'notices', query: { page: pageNum + 1 } }">Next</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import NoticeListMixin from './NoticeListMixin'
  import NoticeItem from './NoticeItem'

  export default {
    components: {
      NoticeItem
    },
    mixins: [NoticeListMixin],
    data () {
      return {
        notices: [],
        pageNum: 0,
        inited: false,
        loading: false,
        hasNext: false,
        hasPrevious: false
      }
    },
    methods: {
      loadNotices () {
        this.inited = false
        this.notices = []

        let page = this.$route.query.page
        if (page === undefined) {
          page = 1
        } else {
          page = parseInt(page)
        }

        if (isNaN(page) || page <= 0) return

        this.pageNum = page
        return this.load(`/api/notices/?page=${page}`)
          .then(({ data: {next, previous} }) => {
            this.inited = true
            this.hasNext = next !== null
            this.hasPrevious = previous !== null
          })
      }
    },
    watch: {
      '$route' () {
        this.loadNotices()
      }
    },
    mounted () {
      this.loadNotices()
    }
  }
</script>
