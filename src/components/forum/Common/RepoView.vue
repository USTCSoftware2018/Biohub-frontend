<template>
  <div class="search-result-tab">
    <div>
      <b class="result-header">
        <a href="#" class="repo-name-head">{{ name }}</a>
        <b class="grade">
          {{ grade }}
        </b>
      </b>
      <p class="result-content">
        {{ abstract }}
      </p>
    </div>
    <div class="result-label">
      <span class="label-list" v-for="l in label">
        {{ l }}
      </span>
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
    props: ['name', 'grade', 'label', 'abstract']
  }
</script>
