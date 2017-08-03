<template>
  <div class="list-group list-experience">
    <router-link :to="{name: 'RepoExperience', params:{id: 1}}" class="list-group-item" id="experience-1">
      <h4 class="list-group-item-heading">List group item heading<a href="#">@sdfg</a> <small>2017.1.1</small>
        <div class="pull-right list-group-item-addon">star:13423</div></h4>
      <p class="list-group-item-text">Lorem ipsum...<br>View Detail</p>
    </router-link>
    <router-link :to="{name: 'RepoExperience', params:{id: 2}}" class="list-group-item" id="experience-2">
      <h4 class="list-group-item-heading">List group item heading<a href="#">@sdfg</a></h4>
      <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
        . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <br>Hide Detail</p>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>