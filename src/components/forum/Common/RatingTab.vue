<template>
  <div>
    <i class="fa activity-indicator" :class="{ 'fa-thumbs-up' : (params.score >= 3), 'fa-thumbs-down' : (params.score < 3) }"></i>
    <p class="activity-content">
      <a :href="'/user/'+params.user">{{ params.user }}</a>
      rated
      <a :href="'/forum/'+params.partName">{{ params.partName }}</a>
      for
      <a class="-profile-repo-score">{{ params.score }}</a>
    </p>
  </div>
</template>

<style scoped>
  .-profile-repo-score {
    color: #d1930d !important;
    text-decoration: none;
  }
</style>

<script>
  export default {
    props: ['params']
  }
</script>
