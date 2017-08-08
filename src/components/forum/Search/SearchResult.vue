<template>
  <div class="search-result">
    <div class="result-header"><a href="#">Result1</a><span class="result-label">Label1</span><div class="pull-right" id="star"></div></div>
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
  export default {
    mounted () {
      $('#star').rating({theme: 'krajee-svg', size: 'xxs', containerClass: 'pull-right', showCaption: false, showClear: false})
      console.log($.fn)
    }
  }
</script>