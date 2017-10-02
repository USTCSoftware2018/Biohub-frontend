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
        <li class="dropdown" id='notice' v-if="$route.name!=='forumHomepage'">
          <a href="javascript:;" class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false" style="padding-top: 17px;padding-bottom: 13px;">
            notice
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu dropdown-notice" style="border: 0px;">
            <header-notice-list></header-notice-list>
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
            <li><router-link :to="{name:'Profile', params:{author: userName}}">Profile</router-link></li>
            <li><a href="javascript:;" v-on:click="LogOut">Log Out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios'
  import HeaderNoticeList from './HeaderNoticeList.vue'

  export default {
    data () {
      return {
        searchContent: ''
      }
    },
    components: {
      HeaderNoticeList
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
      this.$store.commit('loadFromLS')
    }
  }
</script>
