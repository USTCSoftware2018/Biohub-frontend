<template>
  <div class="container profile-container" v-if="user">
    <div class="col-md-3 profile-left">
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
      <follow-button :user="user" v-if="!isSelf"></follow-button>
    </div>
    <div class="col-md-9">
      <div class="profile-biography-frame" v-bind:title="'Biography'"
           v-bind:class="{'profile-biography-folded': isFolded}" v-on:click="isFolded = !isFolded">
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
        <transition name="fade"><component :is="tabName" :user="user"></component></transition>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileNav from './ProfileNav'
  import Activities from './Activities'
  import Followers from './Followers'
  import Following from './Following'
  import Experiences from './Experiences'
  import Stars from './Stars'
  import FollowMixin from '@/components/forum/User/FollowMixin'

  export default {
    data () {
      return {
        user: null,
        isFolded: false
      }
    },
    components: { ProfileNav, Activities, Followers, Following, Stars, Experiences },
    mixins: [FollowMixin],
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
      },
      isSelf () {
        return this.user.username === this.$root.user.username
      }
    },
    methods: {
      loadUserData () {
        return axios.get(`/api/users/n:${this.$route.params.user}/`)
          .then(({ data }) => {
            this.user = data

            return axios.get(`/api/users/n:${this.$route.params.user}/stat/`)
          }).then(({ data }) => {
            this.user = { ...this.user, ...data }
          })
      }
    }
  }
</script>
