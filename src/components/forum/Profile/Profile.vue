<template>
  <div>
    <top-navbar></top-navbar>
    <div class="profile">
      <div class="container">
        <div class="col-md-3 profile-left">
          <div class="profile-avatar-container">
            <div class="profile-avatar">
              <img :src="userAvatar">
            </div>
          </div>
          <div class="user-info">
            <div id="user-name">
            <span v-bind:title="params.user">
              <p>{{ params.user }}</p>
            </span>
            </div>
            <div id="user-mail">
            <span v-bind:title="userMail">
              <p id="user-mail-content">{{ userMail }}</p>
            </span>
            </div>
            <div id="user-stars" v-bind:title="userStar + ' Stars'">
              <span id="user-stars-num">{{ userStar }}</span>
              <i class="fa fa-star" aria-hidden="true"></i>
            </div>
            <div id="edit-button" v-if="isSelf">
              <button class="btn btn-primary follow-button" v-on:click="ToSetting">Edit Profile</button>
            </div>
            <div class="profile-parting-line"></div>
            <div id="personal-info">
              <div :title="userLoc">
                <i class="fa fa-location-arrow float-icon"></i>
                <span>
                <p class="oneline-overflow">{{ userLoc }}</p>
              </span>
              </div>
              <div :title="userLink">
                <i class="fa fa-external-link float-icon"></i>
                <a :href="userLink">
                  <p class="oneline-overflow">{{ userLink }}</p>
                </a>
              </div>
            </div>
            <div class="profile-parting-line"></div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="col-md-10">
            <div class="profile-biography-frame" v-bind:title="'Biography'"
                 v-bind:class="{'profile-biography-folded': isFolded}" v-on:click="foldStateChange">
              <div ref="bioRef" class="profile-biography">
                <span class="arrow-l-int"></span>
                <span class="arrow-l-out"></span>
                <p>
                  {{ biography }}
                </p>
              </div>
            </div>
            <a v-if="hintShow" v-on:click="foldStateChange" style="cursor: pointer">click to unfold</a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="profile-nav">
            <ul class="p-nav p-nav-tabs">
              <li role="presentation" v-bind:class="{ 'active' : ('Activity' === currentPlugin) }"
                  v-on:click="currentPlugin = 'Activity'; params.showIntro = false" id="activity">
                <a href="javascript:;">Activity</a>
              </li>
              <li role="presentation" v-bind:class="{ 'active' : ('Experience' === currentPlugin) }"
                  v-on:click="currentPlugin = 'Experience'; params.showIntro = true" id="experience">
                <a href="javascript:;">Experience</a>
              </li>
              <li role="presentation" v-bind:class="{ 'active' : ('Comment' === currentPlugin) }"
                  v-on:click="currentPlugin = 'Comment'; params.showIntro = true" id="comment">
                <a href="javascript:;">Comment</a>
              </li>
              <li role="presentation" v-bind:class="{ 'active' : ('Star' === currentPlugin) }"
                  v-on:click="currentPlugin = 'Star'; params.showIntro = true" id="star">
                <a href="javascript:;">Star</a>
              </li>
              <li role="presentation" v-bind:class="{ 'active' : ('Rating' === currentPlugin) }"
                  v-on:click="currentPlugin = 'Rating'" id="rating">
                <a href="javascript:;">Rate</a>
              </li>
              <li role="presentation" v-bind:class="{ 'active' : ('Watching' === currentPlugin) }"
                  v-on:click="currentPlugin = 'Watching'" id="watching">
                <a href="javascript:;">Watching</a>
              </li>
            </ul>
          </div>
          <div class="profile-box">
            <component :is="currentPlugin" :params="params"></component>
          </div>
        </div>
      </div>
      <page-footer></page-footer>
    </div>
  </div>
</template>

<style scoped>
  @import "../Common/Common.css";
</style>

<script>
  import topNavbar from '../../Common/topNavbar.vue'
  import PageFooter from '../../Common/PageFooter.vue'
  import axios from 'axios'

  var userStar = 666

  export default {
    beforeCreate () {
      axios.get('/api/users/n:' + this.$route.params.author + '/').then((response) => {
        this.params.user = response.data.username
        this.userMail = response.data.email
        this.userLoc = response.data.address
        this.userLink = response.data.site_url
        this.userAvatar = response.data.avatar_url
        this.biography = response.data.description
        setTimeout(this.foldStateCheck, 1)
      }).catch((_) => {
        window.location.href = '/notfound'
      })
    },
    mounted () {
      // It must be done after html elements are created and be watched by vue
      axios.get('/api/users/me/').then((response) => {
        if (response.data.username === this.params.user) {
          this.isSelf = true
        } else {
          this.isSelf = false
        }
      }).catch((_) => {
        this.isSelf = false
      })
    },
    data () {
      return {
        biography: '',
        userMail: '',
        userStar: userStar,
        userLink: '',
        userLoc: '',
        userAvatar: '',
        isFolded: false,
        isOverflow: false,
        isSelf: false,
        hintShow: false,
        currentPlugin: 'Activity',
        once: false,
        params: {
          user: '',
          showIntro: false
        }
      }
    },
    methods: {
      foldStateCheck: function () {
        var currentHeight = this.$refs.bioRef.offsetHeight
        var currentLength = this.$refs.bioRef.className.length

        this.$refs.bioRef.className += ' profile-biography-folded'
        if (currentHeight > this.$refs.bioRef.offsetHeight) {
          this.$refs.bioRef.className = this.$refs.bioRef.className.slice(0, currentLength)
          this.isOverflow = true
          this.hintShow = true
          this.isFolded = true
        } else {
          this.$refs.bioRef.className = this.$refs.bioRef.className.slice(0, currentLength)
          this.isFolded = false
        }
      },
      foldStateChange: function () {
        if (this.isOverflow) {
          this.isFolded = !this.isFolded
          this.hintShow = !this.hintShow
        }
      },
      ToSetting: function () {
        window.location.href = '/settings'
      }
    },
    components: {
      topNavbar,
      PageFooter,
      Activity: function () {
        return import('./Activity')
      },
      Experience: function () {
        return import('./Experience')
      },
      Comment: function () {
        return import('./Comment')
      },
      Star: function () {
        return import('./Star')
      },
      Rating: function () {
        return import('./Rating')
      },
      Watching: function () {
        return import('./Watching')
      }
    }
  }
</script>
