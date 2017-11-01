<template>
  <div class="footer-container">
    <footer>
      <div class="footer-content">
        <p>
          <router-link :to="{name: 'forum-home'}" class="footer-link">Forum</router-link>
          <router-link :to="{name: 'plugins'}" class="footer-link">Plugins</router-link>
          <a href="#" class="footer-link" target="_blank">Wiki</a>
          <br>
          <a class="github-button" href="https://github.com/igemsoftware2017/USTC-Software-2017" data-icon="octicon-star" data-show-count="true" aria-label="Star igemsoftware2017/USTC-Software-2017 on GitHub" v-show="showGithub">Star</a>
        </p>
        <p>Welcome to the Biohub 2.0. All rights reserved to USTC-Software-2017.</p>
      </div>
    </footer>
  </div>
</template>

<style>
  .footer-container {
    /* position: absolute; */
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
  }

  .footer-content {
    border-top: 1px solid #ddd;
    height: 150px;
    background-color: whitesmoke;
    margin-top: 50px;
    padding-top: 20px;
    padding-bottom:20px;
    color: #b5b5b5;
    height:100%;
  }

  .footer-content iframe {
    margin-top: 10px;
  }

  .footer-content a {
    color: #333 !important;
    text-decoration: none;
  }

  .footer-link {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>

<script>
  export default {
    data () {
      return {
        showGithub: false
      }
    },
    mounted () {
      const link = document.createElement('script')
      link.src = 'https://buttons.github.io/buttons.js'
      link.async = true
      link.onload = () => {
        this.showGithub = true
      }
      document.body.appendChild(link)
    }
  }
</script>
