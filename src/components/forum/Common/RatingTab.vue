<template>
  <div>
    <i class="fa activity-indicator" :class="{ 'fa-thumbs-up' : (p.score >= 3), 'fa-thumbs-down' : (p.score < 3) }"></i>
    <p class="activity-content">
      <a href="/forums/gloit">{{ user }}</a>
      rated
      <a href="#">{{ p.repo }}</a>
      for
      <a class="-profile-repo-score">{{ p.score }}</a>
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
    props: ['user', 'p', 'showIntro']
  }
</script>
