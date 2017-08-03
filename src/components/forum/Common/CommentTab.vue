<template>
  <div>
    <i class="fa fa-commenting activity-indicator"></i>
    <p class="activity-content">
      <a :href="'/user/'+params.user">{{ params.user }}</a>
      commented on an
      <a :href="params.expLink">experience</a>
      of
      <a :href="'/forum/'+params.partName">{{ params.partName }}</a>
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
