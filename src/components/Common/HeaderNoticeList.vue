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
          <a class="pull-right" href="javascript:;" @click="markAllAsRead">
            Mark All As Read
          </a>
        </div>
        <div class="notice-list">
          <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
          <div class="indicator load-more" v-if="next" @click="loadNext">
            {{loading ? 'Loading...' : 'Click to Load More...'}}
          </div>
          <div class="indicator" v-else>~~ No More Notices ~~</div>
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
        loading: false
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
      clear () {
        this.notices = []
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
      this.init()
      this.initEvents()
    }
  }
</script>
