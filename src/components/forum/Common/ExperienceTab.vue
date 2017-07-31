<template>
  <div>
    <i class="fa fa-bookmark activity-indicator"></i>
    <p class="activity-content">
      <a href="/forums/gloit">{{ user }}</a>
      shared
      <a href="#">experience</a>
      on
      <a href="#">{{ p }}</a>
    </p>
    <div v-if="showIntro" class="experience-brief-intro">
      <p>
        this is brief intros
      </p>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['user', 'p', 'showIntro']
  }
</script>
