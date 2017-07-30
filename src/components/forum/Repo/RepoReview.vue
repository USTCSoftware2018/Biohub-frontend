<template>
  <div class="repo-experience-content">
    <div class="experience-header">
      <button class="btn btn-forum">Share Your Experience</button>
        <input class="experience-search" placeholder="search">
    </div>
    <div class="divider" style="border-top: 1px solid #ddd;margin-top: 2rem;"></div>
    <div class="list-group list-experience">
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">List group item heading<a href="#">@sdfg</a> <small>2017.1.1</small>
          <div class="pull-right list-group-item-addon">star:13423</div></h4>
        <p class="list-group-item-text">Lorem ipsum...<br>View Detail</p>
      </a>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">List group item heading<a href="#">@sdfg</a></h4>
        <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br>Hide Detail</p>
      </a>
    </div>
    <editor></editor>
  </div>
</template>

<script>
  import Editor from './Editor.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      Editor
    }
  }
</script>