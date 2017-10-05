<template>
  <div class="container notice-view">
    <div class="col-md-offset-2 col-md-8 notice-view-container">
      <div class="notice-list" v-if="inited">
        <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
        <pager
          :hasNext="hasNext"
          :hasPrevious="hasPrevious"
          :pageNum="pageNum"></pager>
      </div>
    </div>
  </div>
</template>

<script>
  import NoticeListMixin from './NoticeListMixin'
  import NoticeItem from './NoticeItem'
  import PageMixin from '@/components/Common/PageMixin'

  export default {
    components: {
      NoticeItem
    },
    mixins: [NoticeListMixin, PageMixin],
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
      getQueryParams () {
        return {}
      },
      processResponse (response) {
        this.inited = true
        this._handleNewNotices(response.data.results)
      },
      loadNotices () {
        this.inited = false
        this.notices = []

        this._load('/api/notices/')
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
