<template>
  <nav class="navbar navbar-biohub">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Brand</a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="/forum">Forum</a></li>
        <li><a href="/plugins">Plugins</a></li>
      </ul>
      <form class="navbar-form navbar-left" v-if="!($route.name === 'Search')">
        <div class="form-group">
          <input type="text" class="form-control" v-on:keydown.enter.prevent="intoSearch" ref="Search"
                 placeholder="Search" style="font-size: 15px;">
        </div>
      </form>
      <ul v-if="!hasLogged" class="nav navbar-nav navbar-right">
        <li><a href="/login">Login</a></li>
      </ul>
      <ul v-if="!hasLogged" class="nav navbar-nav navbar-right">
        <li><a href="/signup">Signup</a></li>
      </ul>
      <ul v-if="hasLogged" class="nav navbar-nav navbar-right navbar-biohub-toggle">
        <li class="dropdown">
          <a href="javascript:;" class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">
            <span class="navbar-avatar">
              <img :src="avatarURL">
            </span>
            {{ userName }}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" style="border: 0px">
            <li><a :href="'/user/'+userName">Profile</a></li>
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
        hasLogged: false,
        userName: '',
        avatarURL: ''
      }
    },
    methods: {
      LogOut () {
        axios.get('/api/users/logout/').then((response) => {
          window.location.href = '/forum'
        }).catch((e) => {
          window.alert('not logged in yet')
        })
      },
      intoSearch (e) {
        let sValue = this.$refs.Search.value
        this.$router.push({
          name: 'Search',
          params: {
            keyword: sValue
          }
        })
      }
    },
    mounted () {
      axios.get('/api/users/me/').then((response) => {
        console.log(response)
        this.userName = response.data.username
        this.avatarURL = response.data.avatar_url
        this.hasLogged = true
      }).catch((e) => {
        if (e.response.state === 404) {
          this.hasLogged = false
        }
      })
    }
  }
</script>
