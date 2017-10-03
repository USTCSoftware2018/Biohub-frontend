<template>
  <li :class="menuClasses">
    <a href="javascript:;" class="dropdown-toggle"
       role="button"
       style="padding-top: 17px;padding-bottom: 13px;" @click.stop="isOpened = !isOpened">
      notice
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-notice" style="border: 0px;">
      <div class="notice-container" ref="noticeContainer">
        <div class="notice-head clearfix">
          <a href="javascript:;" @click="refresh">
            Refresh
          </a>
          <a class="pull-right" href="javascript:;" @click="markAllAsRead">
            Mark All As Read
          </a>
        </div>
        <div class="notice-list">
          <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
          <div class="indicator load-more" v-if="next || loading" @click="loadNext">
            {{loading ? 'Loading...' : 'Click to Load More...'}}
          </div>
          <div class="indicator" v-else>~~ No More Notices ~~</div>
        </div>
        <div class="notice-footer">
          <router-link :to="{ name: 'notices' }">View All</router-link>
        </div>
      </div>
    </ul>
  </li>
</template>
<script>
  import NoticeItem from './NoticeItem'
  export default {
    components: {NoticeItem},
    data () {
      return {
        notices: [],
        next: null,
        isOpened: false,
        loading: false,
        inited: false
      }
    },
    computed: {
      menuClasses () {
        return {
          dropdown: true,
          open: this.isOpened
        }
      }
    },
    watch: {
      isOpened (newValue) {
        if (newValue && !this.inited) this.init()
      }
    },
    methods: {
      _handleNewNotices (notices) {
        notices.forEach(this._handleSingleNotice.bind(this))
      },
      _handleSingleNotice (notice) {
        notice.created_date = new Date(notice.created)
        let index = _.sortedIndexBy(this.notices, notice, n => -n.created_date)
        this.notices.splice(index, 0, notice)
      },
      markAllAsRead () {
        return axios.get('/api/notices/mark_all_as_read/')
          .then(() => {
            this.notices.forEach(notice => {
              notice.has_read = true
            })
          })
      },
      refresh () {
        this.clear()
        this.init()
      },
      clear () {
        this.notices = []
        this.next = null
        this.inited = false
      },
      load (url) {
        if (!url || this.loading) return

        this.loading = true
        return axios.get(url)
          .then(response => {
            this.next = response.data.next
            this._handleNewNotices(response.data.results)
            return response
          })
          .always(() => { this.loading = false })
      },
      loadNext () {
        return this.load(this.next)
      },
      init () {
        return this.load('/api/notices/')
          .then(() => { this.inited = true })
      },
      reload () {
        this.notices = []
        this.init()
      },
      initEvents () {
        $(document).on('click', e => {
          if (this.isOpened && !$.contains(this.$refs.noticeContainer, e.target)) {
            this.isOpened = false
          }
        })
      }
    },
    mounted () {
      this.initEvents()
    }
  }
</script>
