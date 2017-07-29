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
            <li role="presentation" class="active" id="activities">
              <a>activities</a>
            </li>
            <li role="presentation" id="experiences">
              <a>experiences</a>
            </li>
            <li role="presentation" id="comments">
              <a>comments</a>
            </li>
            <li role="presentation" id="stars">
              <a>stars</a>
            </li>
            <li role="presentation" id="rating">
              <a>rating</a>
            </li>
            <li role="presentation" id="watching">
              <a>watching</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileNavbar from './ProfileNavbar.vue'

  var biography = 't tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    't tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    't tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    'Vis eu nibh omnis.'
  var userMail = 'gloit042@gmail.com'
  var userStar = 666
  var userLoc = 'University of Science and Technology of Hefei'
  var userLink = 'http://home.ustc.edu.cn/~lijh2015'

  // var hint = 'click to show more'

  export default {
    mounted () {
      this.isOverflow = this.$refs.bioRef.offsetHeight < this.$refs.bioRef.scrollHeight
      this.hintShow = this.isOverflow
    },
    data () {
      return {
        biography: biography,
        userMail: userMail,
        userStar: userStar,
        userLink: userLink,
        userLoc: userLoc,
        isFolded: true,
        isOverflow: false,
        hintShow: false
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
      ProfileNavbar
    }
  }
</script>
