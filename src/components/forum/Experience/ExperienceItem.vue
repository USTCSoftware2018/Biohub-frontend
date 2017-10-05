<template>
  <div class="experience-item">
    <h3 class="experience-title">{{ experience.title }}</h3>
    <p>
      {{ experience.content.digest }}
    </p>
  </div>
</template>

<script>
  export default {
    props: ['experience']
  }
</script>
