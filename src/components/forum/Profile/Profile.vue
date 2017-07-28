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
          <div class="user-stars" v-bind:title="userStar + ' Stars'">
            <span id="user-stars-num">{{ userStar }}</span>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
          <div id="edit-button">
            <button class="btn btn-primary follow-button">Edit Profile</button>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-7 ">
        <div class="profile-biography-frame" v-bind:title="'Biography'">
          <div ref="profileBiography" class="profile-biography">
            <span class="arrow-l-int"></span>
            <span class="arrow-l-out"></span>
            <p v-on:click="ifFoldThenUnfold">
              {{ biography }}
            </p>
          </div>
        </div>
        <div class="profile-nav">
          <profile-navbar></profile-navbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileNavbar from './ProfileNavbar.vue'

  var biography = 'Lorem ipsum dolor sit amet, eos ei mnesarchum moderatius, ea qui aeque ridens graeci. Cum suas sale aliquando ex, mel latine sapientem cu, sumo iusto gloriatur qui an. In mel prima corpora delectus, quo periculis vituperata efficiantur ut, no usu simul soleat. No dicant tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    'Vis eu nibh omnis.'
  var userMail = 'gloit042@gmail.com'
  var userStar = 666

  export default {
    data () {
      return {
        biography: biography,
        userMail: userMail,
        userStar: userStar
      }
    },
    methods: {
      ifFoldThenUnfold: function (e) {
        this.$refs.profileBiography.style.height = 'auto'
        this.$refs.profileBiography.style.minHeight = '6em'
        this.$refs.profileBiography.style.overflow = 'inherit'
        this.$refs.profileBiography.style.textOverflow = 'clip'
        this.$refs.profileBiography.style.MsTextOverflow = 'clip'
        this.$refs.profileBiography.style.display = 'block'
      }
    },
    components: {
      ProfileNavbar
    }
  }
</script>


<style>

  .user-stars {
    margin-top: 5px;
    width: 100%;
    height: 30px;
    overflow: hidden;
    font-size: 22px;
    font-weight: 900;
    background-color: white;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  #user-stars-num {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .user-stars i {
    margin-top: 5px;
    margin-right: 10px;
    display: inline;
    float: right;
    font-size: 17px;
    color: darkorange;
  }

  .user-info {
    text-align: left;
    word-wrap: break-word;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis !important;
  }

  .profile-nav {
    margin-top: 10%;
  }

  .follow-button {
    margin-top: 10px;
    width: 100%;
    font-weight: 900;
  }

  #user-name {
    font-size: 30px !important;
  }

  #user-mail {
    color: gray;
    font-size: 14px !important;
  }

  .user-info div span p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis !important;
    margin: 0;
  }

  .profile-tab {
    margin-top: -6%;
    width: 100px;
    padding: 5px 0 5px 0;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #ddd;
    border-bottom: 0px;
  }

  .profile-biography-frame {
    background: white;
    height: 100%;
    padding: 10px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #ddd;
    margin-top: 5%;
  }

  .profile-biography {
    line-height: 1.5em;
    text-align: left;
    min-height: 0em;
    height: 6em;
    overflow: hidden;
    word-wrap: break-word;
    -ms-word-wrap: break-word;
    display: -webkit-box;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .arrow-l-int {
    width: 0px;
    height: 0px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent #ddd transparent transparent;
    position: absolute;
    top: 50px;
    left: -15px;
  }

  .arrow-l-out {
    width: 0px;
    height: 0px;
    border-width: 16px;
    border-style: solid;
    border-color: transparent white transparent transparent;
    position: absolute;
    top: 49px;
    left: -14px;
  }

  .profile {
    margin-top: 5%;
  }

</style>
