<template>
  <div class="navbar navbar-biohub">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <a class="navbar-brand" href="https://biohub.tech">
          <img src="../../assets/img/icon.ico" alt="" style="width: 24px;">
        </a>
        <!-- <router-link class="navbar-brand" :to="{ name: 'forum-home' }"> -->
          <!-- <img src="../../assets/img/icon.png" alt="" style="width: 24px;"> -->
        <!-- </router-link> -->
      </div>
      <!-- <ul class="nav navbar-nav">
        <li><router-link :to="{ name: 'plugins' }">Plugins</router-link></li>
      </ul> -->
      <!-- <form class="navbar-form navbar-left" v-if="!($route.name === 'Search')">
        <div class="form-group has-feedback">
          <input
            type="search" class="form-control"
            v-on:keydown.enter.prevent="intoSearch"
            ref="Search"
            placeholder="Search"
            style="font-size: 15px;"
            v-model="searchContent">
          <a class="form-control-feedback"
             href="javascript:;" style="pointer-events: auto;top: 2px!important;"
             v-if="searchContent !== ''"
             v-on:click="searchContent = ''">
            <i class="fa fa-times" style="font-size: 16px; color: #999!important;"></i>
          </a>
        </div>
      </form> -->

      <!-- <ul v-if="!logined" class="nav navbar-nav navbar-right"> -->
        <!-- <li><router-link :to="{ name: 'login' }">Login</router-link></li> -->
        <!-- <li><router-link :to="{ name: 'signup' }">Signup</router-link></li> -->
      <!-- </ul> -->
      <!-- <ul v-if="logined" class="nav navbar-nav navbar-right navbar-biohub-toggle"> -->
        <!-- <header-notice-list></header-notice-list> -->
        <!-- <li class="dropdown"> -->
          <!-- <a href="javascript:;" class="dropdown-toggle" -->
             <!-- data-toggle="dropdown" -->
             <!-- role="button" -->
             <!-- aria-haspopup="true" -->
             <!-- aria-expanded="false" style="height: 52px;"> -->
            <!-- <span class="navbar-avatar"> -->
              <!-- <img :src="avatarURL"> -->
            <!-- </span> -->
            <!-- {{ userName }} -->
            <!-- <span class="caret"></span> -->
          <!-- </a> -->
          <!-- <ul class="dropdown-menu" style="border: 0px;"> -->
            <!-- <li><router-link :to="{name:'profile', params:{user: userName}}">Profile</router-link></li> -->
            <!-- <li><a href="javascript:;" @click="logOut">Log Out</a></li> -->
          <!-- </ul> -->
        <!-- </li> -->
      <!-- </ul> -->
    </div>
  </div>
</template>

<script>
  import HeaderNoticeList from '@/components/notices/HeaderNoticeList.vue'
  import authController from '@/utils/authController'

  export default {
    data () {
      return {
        searchContent: ''
      }
    },
    mounted () {

    },
    components: {
      HeaderNoticeList
    },
    computed: {
      logined () {
        return (this.$root.user !== null)
      },
      userName () {
        return this.$root.user.username
      },
      avatarURL () {
        return this.$root.user.avatar_url
      }
    },
    methods: {
      logOut () {
        axios.get('/api/users/logout/').then((_) => {
          authController.logout()
        })
      },
      intoSearch (e) {
        this.$router.push({
          name: 'search',
          query: {
            q: this.searchContent
          }
        })
      },
      cleanInput () {
        this.searchContent = ''
      }
    }
  }
</script>
