<template>
  <div class="-profile-activity-tab">
    <div class="result-header">
      <a href="#">{{ params.partName }}</a>
      <div class="profile-repo-score">
        <p>{{ params.grade }}</p>
      </div>
    </div>
    <p class="-profile-repo-info" :title="params.intro">{{ params.intro }}</p>
  </div>
</template>
<style scoped>
  .-profile-repo-info {
    margin-left:20px;
    line-height:1.5em;
    font-size:15px;
    height:3em;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orientation:vertical;
    overflow: hidden;
  }
</style>
<script>
  export default {
    props: ['params'],
    mounted () {
    },
    methods: {}
  }
</script>
