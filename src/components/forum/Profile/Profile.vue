<template>
  <div class="container profile-container" v-if="user">
    <div class="col-md-3">
      <img :src="user.avatar_url" class="avatar_url">
      <div class="username">
        {{ user.username }}
      </div>
      <div class="info">
        <p>
          <i class="fa fa-envelope-o"></i>&nbsp;
          {{ user.email }}
        </p>
        <p v-if="user.site_url">
          <i class="fa fa-link"></i>&nbsp;
          {{ user.site_url }}
        </p>
      </div>
    </div>
    <div class="col-md-9">
      <div class="profile-biography-frame" v-bind:title="'Biography'"
           v-bind:class="{'profile-biography-folded': isFolded}" v-on:click="foldStateChange">
        <div ref="bioRef" class="profile-biography">
          <span class="arrow-l-int"></span>
          <span class="arrow-l-out"></span>
          <p>
            {{ user.description }}
          </p>
        </div>
      </div>
      <profile-nav :user='user'></profile-nav>
      <div class="tab-content">
        <component :is="tabName" :user="user"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileNav from './ProfileNav'
  import Activities from './Activities'
  import Followers from './Followers'
  import Following from './Following'

  export default {
    data () {
      return {
        user: null
      }
    },
    components: { ProfileNav, Activities, Followers, Following },
    mounted () {
      this.loadUserData()
    },
    watch: {
      '$route' (to, from) {
        if (!this.user || this.user.username !== to.params.user) {
          this.user = null
          this.loadUserData()
        }
      }
    },
    computed: {
      tabName () {
        return this.$route.query.tab || 'Activities'
      }
    },
    methods: {
      loadUserData () {
        return axios.get(`/api/users/n:${this.$route.params.user}/`)
          .then(({ data }) => {
            this.user = data
          })
      }
    }
  }
</script>
