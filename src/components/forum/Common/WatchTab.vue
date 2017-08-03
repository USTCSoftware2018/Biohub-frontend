<template>
  <div>
    <i class="fa fa-eye activity-indicator"></i>
    <p class="activity-content">
      <a :href="'/user'+params.user">{{ params.user }}</a>
      watched
      <a href="#">{{ params.partName }}</a>
    </p>
  </div>
</template>

<script>
  export default {
    props: ['params']
  }
</script>
