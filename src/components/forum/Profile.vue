<template>
  <div class="profile">
    <div class="container">
      <div class="col-md-3 profile-left">
        <div class="profile-avatar-container">
          <div class="profile-avatar">
            <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=200&r=g&d=identicon">
          </div>
        </div>
        <div id="author-info">
          <h1> {{ $route.params.author }} </h1>
          <div>
            <a class="profile-follower-num" href="#">55</a>
            <a class="profile-follower" href="#">followers</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  #author-info h1 {
    text-align: left;
    font-size: 40px !important;
  }


  #author-info div a {
    font-family:Helvetica;
    font-weight: 800;
    text-decoration: none;
  }

  .profile-follower-num {
    font-size: 30px;
  }

  .profile-follower {
    font-size:20px;
  }



</style>
