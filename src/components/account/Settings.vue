<template>
  <div>
    <div class="container" style="text-align: left;background-color: white;margin-top: 20px;box-shadow: 0 0 3px #ccc;">
      <div class="col-md-12">
        <div class="settings-title">
          <h3>Profile</h3>
          <div class="pull-right settings-button">
            <button class="btn btn-forum settings-save" v-on:click="UpdateProfile">Save Profile</button>
            <button class="btn btn-default settings-cancel" v-on:click="Cancel">Cancel</button>
          </div>
        </div>
        <div class="col-md-3 settings-left">
          <div class="settings-avatar-container">
            <img :src="avatarURL" style="max-width: 100%;">
          </div>
          <div class="settings-upload-image-button" @click="uploadClick">
            <input type="file" ref="uploadNewAvatar" accept="image/png,image/jpeg"
                   style="opacity:0; width:0; height: 0;" @change.prevent="uploadNewAvatar">
            <button class="btn btn-forum">Upload new avatar</button>
          </div>
        </div>
        <div class="col-md-9 settings-right">
          <div class="settings-text-info">
            <div class="settings-option">
              <h4>Public Email Address:</h4>
              <input v-model="userMail" class="form-control" id="settingInputEmail" placeholder="Your E-mail Address">
            </div>
            <div class="settings-option">
              <h4>Location:</h4>
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
      </div>
      <div class="col-md-12" style="">
        <div class="settings-title">
          <h3>Password</h3>
          </div>
        </div>
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
                     placeholder="Input your new password" id="newPassword" aria-describedby="newPasswordHB">
              <span id="newPasswordHB" class="help-block" v-if="newPwdError">
                Password should at least contain a number and  a character, and its length should be between 6 and 20
              </span>
            </div>
            <div class="form-group" v-bind:class="{'has-error':newPwdReError}">
              <label class="control-label" for="newPasswordRepeat">Repeat New Password</label>
              <input v-model.lazy="newPasswordRepeat" type="password" class="form-control has-error"
                     placeholder="Repeat your new password" id="newPasswordRepeat"
                     aria-describedby="newPasswordRepeatHB">
              <span id="newPasswordRepeatHB" class="help-block" v-if="newPwdReError">Different from the previous one</span>
            </div>
            <div class="alert alert-danger" v-if="passwordError">
              {{ passwordError }}
            </div>
          </div>
          <div class="col-md-12 settings-buttons" style="margin-bottom: 20px;">
            <button class="btn btn-forum settings-save" v-on:click="UpdatePassword">Update password</button>
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
  import authController from '@/utils/authController'

  export default {
    computed: {
      newPwdReError () {
        return this.newPassword && this.newPasswordRepeat && this.newPassword !== this.newPasswordRepeat
      }
    },
    methods: {
      UpdateProfile () {
        axios.patch('/api/users/me/', {
          avatar_url: this.avatarURL,
          email: this.userMail,
          site_url: this.userLink,
          address: this.userLoc,
          description: this.userBio
        }).then((response) => {
          this.$router.push({ name: 'profile', params: { user: this.userName } })
        }).catch((e) => {
          console.log(e)
        })
      },
      Cancel () {
        this.$router.push({ name: 'profile', params: { user: this.userName } })
      },
      UpdatePassword () {
        axios.post('/api/users/change_password/', {
          old: this.oldPassword,
          new1: this.newPassword,
          new2: this.newPasswordRepeat
        }).then((response) => {
          alert('Password changed!\nplease relogin')
          authController.logout()
          this.$router.push({ name: 'login' })
        }).catch((e) => {
          console.log(e.response)
          if (e.response.data.old !== undefined) {
            this.oldPwdError = true
          } else if (e.response.data.new1 !== undefined) {
            this.newPwdError = true
          } else if (e.response.data.new2 !== undefined) {
            this.newPwdReError = true
          } else if (e.response.data.non_field_errors) {
            this.passwordError = e.response.data.non_field_errors.join('\n')
          }
        })
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
          }).then(r => {
            this.avatarURL = r.data
            authController.renew('avatar_url', r.data)
          }).catch((e) => {
            console.log(e)
          })
      },
      loadData () {
        axios.get('/api/users/me/').then((response) => {
          this.avatarURL = response.data.avatar_url
          this.userName = response.data.username
          this.userMail = response.data.email
          this.userLink = response.data.site_url
          this.userLoc = response.data.address
          this.userBio = response.data.description
        }).catch((e) => {
          this.to404()
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
        passwordError: ''
      }
    },
    mounted () {
      this.loadData()
    }
  }

</script>
