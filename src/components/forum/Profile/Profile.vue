<template>
  <div class="profile">
    <div class="container">
      <div class="col-md-3 profile-left">
        <div class="profile-avatar-container">
          <div class="profile-avatar">
            <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=328&r=g&d=identicon">
          </div>
        </div>
        <div class="user-info">
          <div id="user-name">
            <span v-bind:title="$route.params.author">
              <p>{{ $route.params.author }}</p>
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
          <div id="edit-button">
            <button class="btn btn-primary follow-button">Edit Profile</button>
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
              <a href="userLink">
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
      <div class="col-md-8">
        <div class="profile-nav">
          <ul class="nav nav-tabs">
            <li role="presentation" v-bind:class="{ 'active' : ('Activity' === currentPlugin) }"
                v-on:click="currentPlugin = 'Activity'; params.showIntro = false" id="activity">
              <a href="#Activity">activities</a>
            </li>
            <li role="presentation" v-bind:class="{ 'active' : ('Experience' === currentPlugin) }"
                v-on:click="currentPlugin = 'Experience'; params.showIntro = true" id="experience">
              <a href="#Experience">experiences</a>
            </li>
            <li role="presentation" v-bind:class="{ 'active' : ('Comment' === currentPlugin) }"
                v-on:click="currentPlugin = 'Comment'; params.showIntro = true" id="comment">
              <a href="#Comment">comments</a>
            </li>
            <li role="presentation" v-bind:class="{ 'active' : ('Star' === currentPlugin) }"
                v-on:click="currentPlugin = 'Star'; params.showIntro = true" id="star">
              <a href="#Star">stars</a>
            </li>
            <li role="presentation" v-bind:class="{ 'active' : ('Rating' === currentPlugin) }"
                v-on:click="currentPlugin = 'Rating'" id="rating">
              <a href="#Rating">rating</a>
            </li>
            <li role="presentation" v-bind:class="{ 'active' : ('Watching' === currentPlugin) }"
                v-on:click="currentPlugin = 'Watching'" id="watching">
              <a href="#Watching">watching</a>
            </li>
          </ul>
        </div>
        <div class="white-box">
          <component :is="currentPlugin" :params="params"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import "../Common/Common.css"
</style>

<script>
  var biography = 't tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    't tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    'Vis eu nibh omnis.'
  var userMail = 'gloit042@gmail.com'
  var userStar = 666
  var userLoc = 'University of Science and Technology of Hefei'
  var userLink = 'http://home.ustc.edu.cn/~lijh2015'

  export default {
    mounted () {
      this.params.user = this.$route.params.author

      var currentHeight = this.$refs.bioRef.offsetHeight
      var currentLength = this.$refs.bioRef.className.length

      // console.log(this.$refs.bioRef.offsetHeight)
      this.$refs.bioRef.className += ' profile-biography-folded'
      // console.log(this.$refs.bioRef.offsetHeight)

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
    data () {
      return {
        biography: biography,
        userMail: userMail,
        userStar: userStar,
        userLink: userLink,
        userLoc: userLoc,
        isFolded: false,
        isOverflow: false,
        hintShow: false,
        currentPlugin: 'Activity',
        params: {
          user: '',
          showIntro: false
        }
      }
    },
    methods: {
      foldStateChange: function () {
        if (this.isOverflow) {
          this.isFolded = !this.isFolded
          this.hintShow = !this.hintShow
        }
      }
    },
    components: {
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
