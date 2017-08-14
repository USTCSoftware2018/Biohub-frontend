<template>
  <div class="search-result">
    <div class="result-header"><a href="#">Result1</a><span class="result-label result-label-person">Person</span>
      <span class="result-label result-label-parts">Parts</span><span
        class="result-label result-label-device">Device</span>
      <div class="pull-right" id="star" ref="star"></div>
      <star :isEnable="true"></star>
    </div>
    <p class="result-content">Lorem ipsum dolor sit amet,
      consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

  </div>
</template>
<script>
  import $ from 'jquery'
  import '../../../assets/css/star-rating.css'
  import '../../../utils/star-rating'
  import '../../../assets/css/star-theme.css'
  import '../../../utils/theme.min'
  import Star from '../../../utils/Star.vue'

  export default {
    mounted () {
      console.log(this.$refs.star)
      $('#star').rating({
        theme: 'krajee-svg',
        size: 'xxs',
        min: 0,
        max: 5,
        step: 0.5,
        containerClass: 'pull-right',
        showCaption: false,
        showClear: false,
        displayOnly: false
      })
      $('#star').rating('update', 3.2)
      $('#star').on('rating.change', this.Rate)
      console.log(this.$refs.star)
    },
    components: {
      Star
    },
    methods: {
      Rate (event, value, caption) {
        $('#star').rating('refresh', {displayOnly: true})
      }
    }
  }
</script>
