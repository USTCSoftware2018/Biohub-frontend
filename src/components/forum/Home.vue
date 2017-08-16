<template>
  <div>
    <div class="forum-start">
      <div class="forum-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button class="btn btn-biohub btn-biohub-forum-welcome-default">Learn More</button>
        <button class="btn btn-biohub btn-biohub-forum-welcome-notice" @click="$router.push({name:'newDiscussion'})">Start a Discussion</button>
      </div>

    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-8 less-padding">
          <div class="forum-activity-border">
            <div class="forum-activity-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
              . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            <div class="forum-activity-label">1926 08 17</div>
          </div>
          <div class="forum-activity-border">
            <div class="forum-activity-content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
              . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            <div class="forum-activity-label">1926 08 17</div>
          </div>
        </div>
        <div class="col-md-4 less-padding">
          <repo-list inside="home"></repo-list>
        </div>
      </div>
    </div>
      <page-footer></page-footer>
  </div>
</template>

<script>
  import topNavbar from '../Common/topNavbar.vue'
  import RepoList from './Repo/RepoList.vue'
  import PageFooter from '../Common/PageFooter.vue'

  export default {
    components: {
      topNavbar, RepoList, PageFooter
    }
  }
</script>
<style scoped>
  @import "../forum/Common/Common.css";
</style>
