<template>
  <div class="-profile-activity-tab">
    <i class="fa fa-book activity-indicator-2"></i>
    <div class="-profile-repo-header">
      <a href="#">{{ params.partName }}</a>
      <div class="profile-repo-score">
        <p>{{ params.grade }}</p>
      </div>
    </div>
    <p class="-profile-repo-info" :title="params.intro" v-if="params.intro !== ''">{{ params.intro }}</p>
    <p class="-profile-repo-info" title="Empty" v-if="params.intro === ''">Empty</p>
  </div>
</template>
<style scoped>
  .-profile-repo-header {
    font-size: 20px;
    font-color: #1695a3;
    margin: 5px;
  }

  .-profile-repo-info {
    margin-left: 20px;
    line-height: 1.5em;
    font-size: 15px;
    height: 3em;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orientation: vertical;
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
