<template>
  <div>
    <top-navbar></top-navbar>
    <div class="col-md-2"></div>
    <div class="col-md-7">
      <div class="settings-title">
        <h1>Settings</h1>
      </div>
      <div class="col-md-6 settings-left">
        <div class="settings-avatar-container">
          <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=328&r=g&d=identicon">
        </div>
        <div class="settings-upload-image-button">
          <button class="btn btn-default">Upload new avatar</button>
        </div>
      </div>
      <div class="col-md-6 settings-right">
        <div class="settings-text-info">
          <div class="settings-option">
            <h4>Public Email Address:</h4>
            <input class="form-control" id="settingInputEmail" placeholder="Your E-mail Address">
          </div>
          <div class="settings-option">
            <h4>Public Locating:</h4>
            <input class="form-control" id="settingInputLocation" placeholder="Your Location">
          </div>
          <div class="settings-option">
            <h4>Public Link:</h4>
            <input class="form-control" id="settingInputURL" placeholder="URLs">
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-8 settings-biography">
        <h3>Biography</h3>
        <textarea placeholder="Tell others about yourself"></textarea>
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-12">
        <button class="btn btn-primary settings-save">Save Profile</button>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>
<style scoped>
</style>
<script>
  import topNavbar from './topNavbar.vue'

  export default {
    components: {
      topNavbar
    }
  }

</script>
