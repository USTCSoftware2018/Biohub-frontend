<template>
  <div class="footer-container">
    <footer>
      <div class="footer-content">
        <p>
          <a href="/forum" class="footer-link">Forum</a>
          <a href="/plugins" class="footer-link">Plugins</a>
          <a href="#" class="footer-link">Wiki</a>
        </p>
        <p>Welcome to the biohub. 2017 USTC-Software. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .footer-container {
    position: absolute;
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

  .footer-content a {
    color: #333 !important;
    text-decoration: none;
  }

  .footer-link {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
