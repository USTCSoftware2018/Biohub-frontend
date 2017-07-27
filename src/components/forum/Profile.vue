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
          <div id="follow-button">
            <button class="btn btn-primary follow-button">Follow</button>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-7 ">
        <div class="profile-tab">
          About me
        </div>
        <div class="profile-biography-frame">
          <div class="outer-container">
            <div class="profile-biography">
              {{ biography }}
            </div>
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
  export default {
    data () {
      return {
        biography: biography,
        userMail: userMail
      }
    },
    components: {
      ProfileNavbar
    }
  }
</script>


<style>

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
    margin:0;
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
    padding: 10px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #ddd;
  }

  .profile-biography {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    font-size: 14px;
    text-align: left;
    overflow-y: scroll;
  }

  .outer-container {
    height: 140px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .inner-container::-webkit-scrollbar {
    display: none;
  }

  .profile {
    margin-top: 5%;
  }

</style>
