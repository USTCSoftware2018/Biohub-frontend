<template>
  <div>
    <top-navbar></top-navbar>
    <div class="container">
      <div class="col-md-12">
        <div class="settings-title">
          <h1>Settings</h1>
        </div>
        <div class="col-md-6 settings-left">
          <div class="settings-avatar-container">
            <img :src="avatarURL">
          </div>
          <div class="settings-upload-image-button">
            <button class="btn btn-default">Upload new avatar</button>
          </div>
          <div class="settings-plugins">
            <div class="settings-plugins-plugin" title="plugins">
              <a href="/plugins">
                <img src="https://www.gravatar.com/avatar/d8cc2fe518e0df9a75316d124c2fc057?s=200&r=g&d=identicon">
              </a>
            </div>
            <div class="settings-plugins-add">
              <div>
                <a href="#">
                  <i class="fa fa-plus"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
        <div class="col-md-6 settings-right">
          <div class="settings-text-info">
            <div class="settings-option">
              <h4>Public Email Address:</h4>
              <input v-model="userMail" class="form-control" id="settingInputEmail" placeholder="Your E-mail Address">
            </div>
            <div class="settings-option">
              <h4>Public Locating:</h4>
              <input v-model="userLoc" class="form-control" id="settingInputLocation" placeholder="Your Location">
            </div>
            <div class="settings-option">
              <h4>Public Link:</h4>
              <input v-model="userLink" class="form-control" id="settingInputURL" placeholder="URLs">
            </div>
            <div class="settings-option settings-biography">
              <h4>Biography:</h4>
              <textarea v-model="userBio" placeholder="Tell others about yourself"></textarea>
            </div>
          </div>
        </div>
        <div class="col-md-12 setting-buttons">
          <button class="btn btn-primary settings-save" v-on:click="UpdateProfile">Save Profile</button>
          <button class="btn btn-default settings-cancel" v-on:click="Cancel">Cancel</button>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<script>
  import topNavbar from './Common/topNavbar.vue'
  import PageFooter from './Common/PageFooter.vue'
  import axios from 'axios'

  export default {
    methods: {
      UpdateProfile () {
        axios.patch('/api/users/me/', {
          avatar_url: this.avatarURL,
          email: this.userMail,
          site_url: this.userLink,
          address: this.userLoc,
          description: this.userBio
        }).then((response) => {
          window.location.href = '/user/' + this.userName
        }).catch((e) => {
          console.log(e)
        })
      },
      Cancel () {
        window.location.href = '/user/' + this.userName
      }
    },
    data () {
      return {
        avatarURL: '',
        userName: '',
        userMail: '',
        userLink: '',
        userLoc: '',
        userBio: ''
      }
    },
    mounted () {
      axios.get('/api/users/me/').then((response) => {
        this.avatarURL = response.data.avatar_url
        this.userName = response.data.username
        this.userMail = response.data.email
        this.userLink = response.data.site_url
        this.userLoc = response.data.address
        this.userBio = response.data.description
      }).catch((e) => {
        window.location.href = '/notfound'
      })
    },
    components: {
      topNavbar,
      PageFooter
    }
  }

</script>
