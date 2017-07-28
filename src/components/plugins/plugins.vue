<template>
  <div>
    <top-navbar></top-navbar>
    <ul class="nav nav-tabs">
      <li role="presentation" class="active"><a href="#">ABACUS</a></li>
      <li role="presentation"><a href="#">Biobrick Manager</a></li>
      <li role="presentation"><a href="#">...</a></li>
    </ul>
  </div>
</template>

<script>
  import topNavbar from '../topNavbar.vue'
  export default {
    components: { topNavbar }
  }
</script>