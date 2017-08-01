<template>
  <div>
    <top-navbar></top-navbar>
    <div class="forum-start">
      <div class="forum-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button class="btn btn-biohub btn-biohub-forum-welcome-default">Learn More</button>
        <button class="btn btn-biohub btn-biohub-forum-welcome-notice">Start a Discussion</button>
      </div>

    </div>
    <div class="row">
      <div class="container">
        <div class="col-md-8 less-padding">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
            . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div class="col-md-4 less-padding">
          <repo-list inside="home"></repo-list>
        </div>
      </div>
    </div>
      <PageFooter ></PageFooter>
  </div>
</template>

<script>
  import topNavbar from '../topNavbar.vue'
  import RepoList from './Repo/RepoList.vue'
  import PageFooter from './Common/PageFooter.vue'

  export default {
    components: {
      topNavbar, RepoList, PageFooter
    }
  }
</script>
