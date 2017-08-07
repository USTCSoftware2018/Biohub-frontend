<template>
  <div class="search-result-tab">
    <div>
      <b class="result-header">
        <a href="#" class="repo-name-head">{{ params.partName }}</a>
        <b class="grade">
          {{ params.grade }}
        </b>
        <span class="label-list" v-for="l in params.label">
        {{ l }}
      </span>
      </b>
      <p class="result-content">
        {{ params.intro }}
      </p>
    </div>
    <div class="result-label">

      <a href="#"><img src="../../../assets/img/mark.png" class="img-collect"></a>
    </div>
  </div>
</template>

<style scoped>
  @import 'Common.css';
  * {
    text-align: left;
  }
</style>

<script>
  export default {
    name: 'RepoView',
    props: ['params']
  }
</script>
