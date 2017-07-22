<template>
  <div>
    <top-navbar></top-navbar>
    <div id="subcontent">
      <div id="subcontent-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button class="btn btn-biohub btn-biohub-community-welcome-default">Learn More</button>
        <button class="btn btn-biohub btn-biohub-community-welcome-default">Upload Your Part</button>
      </div>

    </div>
  </div>
</template>

<script>
  import topNavbar from '../topNavbar.vue'

  export default {
    components: {
      topNavbar
    }
  }
</script>
