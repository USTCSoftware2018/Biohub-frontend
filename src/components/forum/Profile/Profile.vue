<template>
  <div class="container profile-container" v-if="user">
    <div class="col-md-3">
      <img :src="user.avatar_url" class="avatar_url">
      <div class="username">
        {{ user.username }}
      </div>
      <div class="info">

      </div>
    </div>
    <div class="col-md-9">
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

  export default {
    data () {
      return {
        user: null
      }
    },
    components: { ProfileNav, Activities },
    mounted () {
      this.loadUserData()
    },
    beforeRouteUpdate (to, from, next) {
      if (!this.user || this.user.username !== to.params.user) {
        this.user = null
        this.loadUserData()
      }
      next()
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
