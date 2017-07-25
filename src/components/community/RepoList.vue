<template>
  <div class="repo-list-wrapper" v-bind:class="{repo_home: insideHome, repo_profile: insideProfile}">
    <ul class="list-group">
      <li class="list-group-header">Your Parts & Devices</li>
      <li class="list-group-item"><a href="#">Cras justo odio</a></li>
      <li class="list-group-item"><a href="#">Dapibus ac facilisis in</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['inside'],
    data () {
      return {
        sInside: this.inside,
        insideHome: false,
        insideProfile: false
      }
    },
    mounted () {
      if (this.sInside === 'home') {
        this.insideHome = true
      } else {
        this.insideProfile = true
      }
    }
  }
</script>