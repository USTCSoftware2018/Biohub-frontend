<template>
  <div>
    <i class="fa fa-eye activity-indicator"></i>
    <p class="activity-content">
      <a href="/forums/gloit">{{ user }}</a>
      watched
      <a href="#">{{ p }}</a>
    </p>
  </div>
</template>

<script>
  export default {
    props: ['user', 'p', 'showIntro']
  }
</script>
