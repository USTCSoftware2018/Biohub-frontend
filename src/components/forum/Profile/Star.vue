<template>
  <div class="star-box">
    <div v-for="(repo, i) in starredRepos" :key="i" class="star-tab">
      <i class="fa fa-star activity-indicator"></i>
      <p class="activity-content">
        <a href="/forums/gloit">{{ user }}</a>
        starred
        <a href="#">{{ repo }}</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
  @import "../Common/Common.css";
  .star-box {
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
  }
</style>

<script>
  export default {
    props: ['user'],
    data () {
      return {
        starredRepos: [
          'Repo A',
          'Repo B'
        ]
      }
    }
  }
</script>
