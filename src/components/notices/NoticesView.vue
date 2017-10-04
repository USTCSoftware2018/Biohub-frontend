<template>
  <div class="container notice-view">
    <div class="col-md-offset-2 col-md-8 notice-view-container">
      <div class="notice-list" v-if="inited">
        <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
        <pager
          :hasNext="hasNext"
          :hasPrevious="hasPrevious"
          :nextRoute="nextRoute"
          :previousRoute="previousRoute"></pager>
      </div>
    </div>
  </div>
</template>

<script>
  import NoticeListMixin from './NoticeListMixin'
  import NoticeItem from './NoticeItem'
  import Pager from '@/components/Common/Pager'
  import { normalizedPageNum } from '@/utils/page'

  export default {
    components: {
      NoticeItem,
      Pager
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
    computed: {
      nextRoute () {
        return {
          name: 'notices',
          query: {
            page: this.pageNum + 1
          }
        }
      },
      previousRoute () {
        return {
          name: 'notices',
          query: {
            page: this.pageNum - 1
          }
        }
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
          .then((response) => {
            this.inited = true
            this.hasNext = response.data.next !== null
            this.hasPrevious = response.data.previous !== null

            return response
          }).always(response => {
            this.pageNum = normalizedPageNum(response)
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
