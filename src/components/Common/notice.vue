<template>
    <div v-bind:class="{noticeHome: isHome}">
      <div class="noticeHead">Notice <a v-if="!isHome">View All</a><a class="pull-right">Clear All</a></div>
      <div v-if="isEmpty">
        Empty
      </div>
      <li v-for="item in notice.results" v-html="item.message" class="noticeItem"></li>
      <div class="noticeFoot">sdfsdf</div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        notice: null,
        hasMore: false,
        isEmpty: true
      }
    },
    computed: {
      isHome () {
        return (this.$route.name === 'forumHomepage')
      }
    },
    mounted () {
      console.log(this.$route, this.$store)
      axios.get('/api/notices/').then((response) => {
        this.notice = response.data
        let titlePatt = /\[\[(.*?)\]\]/g
        let urlPatt = /\(\((.*?)\)\)/g
        if (this.notice.results.length > 0) this.isEmpty = false
        _.forEach(this.notice.results, (notice) => {
          let count = 0
          notice.message = '<p>' + notice.message + '</p>'
          let urlContainer = notice.message.match(urlPatt)
          axios.get(urlContainer[0].substring(2, urlContainer[0].length - 2)).then((response) => {
            urlContainer[0] = '/user/' + response.data.username + '/'
            notice.message = notice.message.replace(titlePatt, (place) => {
              let length = place.length
              let uLength = urlContainer[count].length
              if (count === 0) {
                count++
                return '</p><a href="' + urlContainer[0] + '">' + place.substring(2, length - 2) + '</a><p>'
              } else {
                count++
                return '</p><a href="' + urlContainer[count - 1].substring(6, uLength - 2) + '">' + place.substring(2, length - 2) + '</a><p>'
              }
            })
            notice.message = notice.message.replace(urlPatt, '')
            notice.created = notice.created.slice(0, 10) + ' ' + notice.created.slice(11, -8)
          })
        })
      })
    }
  }
</script>