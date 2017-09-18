<template>
  <nav class="navbar navbar-biohub">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Brand</a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="/forum">Forum</a></li>
        <li><a href="/plugins">Plugins</a></li>
      </ul>
      <form class="navbar-form navbar-left" v-if="!($route.name === 'Search')">
        <div class="form-group has-feedback">
          <input type="search" class="form-control" v-on:keydown.enter.prevent="intoSearch" ref="Search"
                 placeholder="Search" style="font-size: 15px;" v-model="searchContent">
          <a class="form-control-feedback"
             href="javascript:;" style="pointer-events: auto;top: 2px!important;"
             v-if="searchContent !== ''"
             v-on:click="searchContent = ''">
            <i class="fa fa-times" style="font-size: 16px; color: #999!important;"></i>
          </a>
        </div>
      </form>

      <ul v-if="!hasLogged" class="nav navbar-nav navbar-right">
        <li><a href="/login">Login</a></li>
      </ul>
      <ul v-if="!hasLogged" class="nav navbar-nav navbar-right">
        <li><a href="/signup">Signup</a></li>
      </ul>
      <ul v-if="hasLogged" class="nav navbar-nav navbar-right navbar-biohub-toggle">
        <li class="dropdown" id='notice'>
          <a href="javascript:;" class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false" style="padding-top: 17px;padding-bottom: 13px;">
            notice
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu dropdown-notice" style="border: 0px;">
            <li v-for="item in notice.results" v-html="item.message" class="noticeItem"></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="javascript:;" class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false" style="">
            <span class="navbar-avatar">
              <img :src="avatarURL">
            </span>
            {{ userName }}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" style="border: 0px;">
            <li><a :href="'/user/'+userName" >Profile</a></li>
            <li><a href="javascript:;" v-on:click="LogOut">Log Out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        searchContent: '',
        notice: null
      }
    },
    computed: {
      hasLogged () {
        return this.$store.getters.hasLogin
      },
      userName () {
        return this.$store.getters.userName
      },
      avatarURL () {
        return this.$store.state.UserAuth.loggedUser.avatar_url
      }
    },
    methods: {
      LogOut () {
        this.$store.dispatch('logout')
      },
      intoSearch (e) {
        let sValue = this.$refs.Search.value
        this.$router.push({
          name: 'Search',
          params: {
            keyword: sValue
          }
        })
      },
      cleanInput () {
        this.searchContent = ''
      }
    },
    mounted () {
      console.log(this.$store)
      this.$store.commit('loadFromLS')
      axios.get('/api/notices/').then((response) => {
        this.notice = response.data
        let titlePatt = /\[\[(.*?)\]\]/g
        let urlPatt = /\(\((.*?)\)\)/g
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
