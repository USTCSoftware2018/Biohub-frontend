<template>
  <div>
    <i class="fa fa-bookmark activity-indicator"></i>
    <p class="activity-content">
      <a href="/forums/gloit">{{ params.user }}</a>
      shared
      <a :href="params.expLink">experience</a>
      on
      <a href="#">{{ params.partName }}</a>
    </p>
    <div v-if="showIntro" class="experience-brief-intro">
      <p>
        {{ params.intro }}
      </p>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['params', 'showIntro']
  }
</script>
