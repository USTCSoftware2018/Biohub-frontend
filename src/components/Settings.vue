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
            <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=328&r=g&d=identicon">
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
                <input class="form-control" id="settingInputEmail" placeholder="Your E-mail Address">
              </div>
              <div class="settings-option">
                <h4>Public Locating:</h4>
                <input class="input-biohub form-control" id="settingInputLocation" placeholder="Your Location">
              </div>
              <div class="settings-option">
                <h4>Public Link:</h4>
                <input class="input-biohub form-control" id="settingInputURL" placeholder="URLs">
              </div>
              <div class="settings-option settings-biography">
                <h4>Biography:</h4>
                <textarea placeholder="Tell others about yourself"></textarea>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-12">
          <button class="btn btn-primary settings-save">Save Profile</button>
        </div>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<style scoped>
</style>
<script>
  import topNavbar from './Common/topNavbar.vue'
  import PageFooter from './Common/PageFooter.vue'

  export default {
    components: {
      topNavbar, PageFooter
    }
  }

</script>
