<template>
  <div>
    <i class="fa fa-bookmark activity-indicator"></i>
    <p class="activity-content">
      <a href="/forums/gloit">{{ params.user }}</a>
      shared
      <a :href="params.expLink">experience</a>
      on
      <a :href="'/forum/'+params.partName">{{ params.partName }}</a>
    </p>
  </div>

</template>

<script>
  export default {
    props: ['params', 'showIntro']
  }
</script>
