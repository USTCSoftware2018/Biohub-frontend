<template>
  <li :class="menuClasses">
    <a href="javascript:;" class="dropdown-toggle"
       role="button"
       style="padding-top: 17px;padding-bottom: 13px;" @click.stop="isOpened = !isOpened">
      <i class="fa fa-bell-o" style="font-size: 1.2em;">
        <span class="red-dot" v-if="unreadCount"></span>
      </i>
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
        <div class="notice-list top-nav">
          <notice-item v-for="item in notices" :notice="item" :key="item.id" @marked="onMarked"></notice-item>
          <div class="indicator load-more" v-if="next || loading" @click="loadNext">
            {{loading ? 'Loading...' : 'Click to Load More...'}}
          </div>
          <div class="indicator" v-else>~~ No More Notices ~~</div>
        </div>
        <div class="notice-footer">
          <a href="javascript:;" @click="viewAllClick">View All</a>
        </div>
      </div>
    </ul>
  </li>
</template>
<style scoped>
  .red-dot {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 4px;
    border: 1px solid white;
  }
</style>

<script>
  import NoticeItem from './NoticeItem'
  import NoticeListMixin from './NoticeListMixin'
  import websocket from '@/utils/websocket'

  export default {
    components: {NoticeItem},
    mixins: [NoticeListMixin],
    data () {
      return {
        notices: [],
        next: null,
        isOpened: false,
        loading: false,
        inited: false,
        unreadCount: 0
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
      markAllAsRead () {
        return axios.get('/api/notices/mark_all_as_read/')
          .then(() => {
            this.notices.forEach(notice => {
              notice.has_read = true
            })
          })
      },
      onMarked () {
        this.unreadCount--
        if (this.unreadCount < 0) this.unreadCount = 0
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
      },
      viewAllClick () {
        this.isOpened = false
        this.$router.push({ name: 'notices' })
      }
    },
    mounted () {
      this.initEvents()
      websocket.on('message-notices', data => {
        this.unreadCount = data
        if (this.unreadCount) {
          this.clear()
          if (this.isOpened) this.init()
        }
      })
    }
  }
</script>
