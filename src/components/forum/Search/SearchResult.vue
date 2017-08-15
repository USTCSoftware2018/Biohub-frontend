<template>
  <div class="search-result">
    <div class="result-header"><a href="#">Result1</a><span class="result-label result-label-person">Person</span>
      <span class="result-label result-label-parts">Parts</span>
      <span class="result-label result-label-device">Device</span>
      <star :isEnable="true" :initial="3.4"></star>
    </div>
    <p class="result-content">Lorem ipsum dolor sit amet,
      consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</template>
<script>
  import Star from '../../../utils/Star.vue'

  export default {
    mounted () {
    },
    components: {
      Star
    },
    methods: {
    }
  }
</script>
