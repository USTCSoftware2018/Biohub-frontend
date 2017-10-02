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
        <div class="notice-head">Notice <a v-if="!isHome">View All</a><a class="pull-right">Clear All</a></div>
        <div v-if="!notices.length">
          Empty
        </div>
        <div class="notice-list">
          <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
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
        isOpened: false
      }
    },
    computed: {
      isHome () {
        return (this.$route.name === 'forumHomepage')
      },
      menuClasses () {
        return {
          dropdown: true,
          open: this.isOpened
        }
      }
    },
    methods: {
      clear () {
        this.notices = []
      },
      load (url) {
        if (!url) return

        return axios.get(url).then(response => {
          this.next = response.next
          console.log(response.data)
          response.data.results.forEach(item => {
            item.created_time = new Date(item.created_time)
            this.notices.push(item)
          })
          return response
        })
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
      }
    },
    mounted () {
      this.init()

      $(document).on('click', e => {
        if (this.isOpened && !$.contains(this.$refs.noticeContainer, e.target)) {
          this.isOpened = false
        }
      })
    }
  }
</script>
