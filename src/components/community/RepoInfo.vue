<template>
  <div class="repo-wrapper">
    <div class="repo-info-header">
      <div class="repo-info-name">
        {{ $route.params.repo }}
      </div>
      <div class="repo-info-addon">
        Uploaded by: <router-link :to="{ name: 'Profile', params: { userID: $route.params.author }">{{ $route.params.author }}</a> | Followers: <a href="#">Number</a>
      </div>
    </div>
    <div class="repo-info-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
        . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>
