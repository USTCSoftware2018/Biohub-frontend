<template>
  <div>
    <div class="container" style="text-align: left;">
      <div class="col-md-12">
        <div class="settings-title">
          <h1>Profile</h1>
        </div>
        <div class="col-md-6 settings-left">
          <div class="settings-avatar-container">
            <img :src="avatarURL">
          </div>
          <div class="settings-upload-image-button" @click="uploadClick">
            <input type="file" ref="uploadNewAvatar" accept="image/png,image/jpeg"
                   style="opacity:0; width:0; height: 0;" @change.prevent="uploadNewAvatar">
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
        <div class="col-md-12 settings-buttons">
          <button class="btn btn-primary settings-save" v-on:click="UpdateProfile">Save Profile</button>
          <button class="btn btn-default settings-cancel" v-on:click="Cancel">Cancel</button>
        </div>
      </div>
      <div class="col-md-12" style="margin-top: 2em;">
        <h1>Password</h1>
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="settings-text-info">
            <div class="form-group" v-bind:class="{'has-error': oldPwdError}">
              <label class="control-label" for="oldPassword">Old Password</label>
              <input v-model="oldPassword" type="password" class="form-control has-error"
                     placeholder="Input your old password" id="oldPassword" aria-describedby="oldPasswordHB">
              <span id="oldPasswordHB" class="help-block" v-if="oldPwdError">Wrong old password!</span>
            </div>
            <div class="form-group" v-bind:class="{'has-error':newPwdError}">
              <label class="control-label" for="newPassword">New Password</label>
              <input v-model.lazy="newPassword" type="password" class="form-control has-error"
                     placeholder="Input your new password" id="newPassword" aria-describedby="newPasswordHB"
                     @change="checkPwd" @focus="checkPwd">
              <span id="newPasswordHB" class="help-block" v-if="newPwdError">
                Password should at least contain a number and  a character, and its length should be between 6 and 20
              </span>
            </div>
            <div class="form-group" v-bind:class="{'has-error':newPwdReError}">
              <label class="control-label" for="newPasswordRepeat">Repeat New Password</label>
              <input v-model.lazy="newPasswordRepeat" type="password" class="form-control has-error"
                     placeholder="Repeat your new password" id="newPasswordRepeat"
                     aria-describedby="newPasswordRepeatHB" @change="checkPwd" @focus="checkPwd">
              <span id="newPasswordRepeatHB" class="help-block" v-if="newPwdReError">Different from last one</span>
            </div>
          </div>
          <div class="col-md-12 settings-buttons">
            <button class="btn btn-primary settings-save" v-on:click="UpdatePassword">Update password</button>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  h1 {
    text-align: center;
  }

  label {
    font-size: 18px;
  }
</style>
<script>
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
      },
      UpdatePassword () {
        axios.post('/api/users/change_password/', {
          old: this.oldPassword,
          new1: this.newPassword,
          new2: this.newPasswordRepeat
        }).then((response) => {
          alert('Password changed!\nplease relogin')
          window.location.href = '/login'
        }).catch((e) => {
          console.log(e.response)
          if (e.response.data.old !== undefined) {
            this.oldPwdError = true
          } else if (e.response.data.new1 !== undefined) {
            this.newPwdError = true
          } else if (e.response.data.new2 !== undefined) {
            this.newPwdReError = true
          }
        })
      },
      checkPwd () {
        this.newPwdReError = this.newPassword !== this.newPasswordRepeat
      },
      uploadClick () {
        this.$refs.uploadNewAvatar.click()
      },
      uploadNewAvatar (p) {
        let file = p.target.files[0]
        let param = new FormData()
        param.append('file', file, file.name)
        param.append('chunk', 0)
        axios.post('/api/users/upload_avatar/',
          param, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((_) => {
            window.location.href = '/settings'
          }).catch((e) => {
            console.log(e)
          })
      }
    },
    data () {
      return {
        avatarURL: '',
        userName: '',
        userMail: '',
        userLink: '',
        userLoc: '',
        userBio: '',
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        oldPwdError: false,
        newPwdError: false,
        newPwdReError: false
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
    }
  }

</script>
