<template>
  <div class="search-result">
    <div class="result-header">
      <a href="#">{{ params.partName }}</a>
      <span class="result-label result-label-person">Person</span>
      <span class="result-label result-label-parts">Parts</span>
      <span class="result-label result-label-device">Device</span>
      <div class="profile-repo-score">
        <p>{{ params.grade }}</p>
      </div>
    </div>
    <p class="result-content">{{ params.intro }}</p>
  </div>
</template>
<script>
  export default {
    props: ['params'],
    mounted () {
    },
    methods: {}
  }
</script>
