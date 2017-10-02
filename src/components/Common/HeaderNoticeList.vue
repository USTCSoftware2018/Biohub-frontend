<template>
    <div class="notice-container">
      <div class="notice-head">Notice <a v-if="!isHome">View All</a><a class="pull-right">Clear All</a></div>
      <div v-if="!notices.length">
        Empty
      </div>
      <div class="notice-list">
        <notice-item v-for="item in notices" :notice="item" :key="item.id"></notice-item>
      </div>
    </div>
</template>
<script>
  import NoticeItem from './NoticeItem'
  export default {
    components: {NoticeItem},
    data () {
      return {
        notices: [],
        next: null
      }
    },
    computed: {
      isHome () {
        return (this.$route.name === 'forumHomepage')
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
    }
    // mounted () {
    //   console.log(this.$route, this.$store)
    //   axios.get('/api/notices/').then((response) => {
    //     this.notice = response.data
    //     let titlePatt = /\[\[(.*?)\]\]/g
    //     let urlPatt = /\(\((.*?)\)\)/g
    //     if (this.notice.results.length > 0) this.isEmpty = false
    //     _.forEach(this.notice.results, (notice) => {
    //       let count = 0
    //       notice.message = '<p>' + notice.message + '</p>'
    //       let urlContainer = notice.message.match(urlPatt)
    //       axios.get(urlContainer[0].substring(2, urlContainer[0].length - 2)).then((response) => {
    //         urlContainer[0] = '/user/' + response.data.username + '/'
    //         notice.message = notice.message.replace(titlePatt, (place) => {
    //           let length = place.length
    //           let uLength = urlContainer[count].length
    //           if (count === 0) {
    //             count++
    //             return '</p><a href="' + urlContainer[0] + '">' + place.substring(2, length - 2) + '</a><p>'
    //           } else {
    //             count++
    //             return '</p><a href="' + urlContainer[count - 1].substring(6, uLength - 2) + '">' + place.substring(2, length - 2) + '</a><p>'
    //           }
    //         })
    //         notice.message = notice.message.replace(urlPatt, '')
    //         notice.created = notice.created.slice(0, 10) + ' ' + notice.created.slice(11, -8)
    //       })
    //     })
    //   })
    // }
  }
</script>
