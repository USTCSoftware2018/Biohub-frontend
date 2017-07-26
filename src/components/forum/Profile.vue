<template>
  <div class="profile">
    <div class="container">
      <div class="col-md-3 profile-left">
        <div class="profile-avatar-container">
          <div class="profile-avatar">
            <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=328&r=g&d=identicon">
          </div>
        </div>
        <div id="author-info">
          <h1> {{ $route.params.author }} </h1>

        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-6">
        <div class="outer-container">
            <div class="profile-biography">
              Lorem ipsum dolor sit amet, eos ei mnesarchum moderatius, ea qui aeque ridens graeci. Cum suas sale aliquando ex, mel latine sapientem cu, sumo iusto gloriatur qui an. In mel prima corpora delectus, quo periculis vituperata efficiantur ut, no usu simul soleat. No dicant tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.
              Vis eu nibh omnis.
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
    font-family: Helvetica;
    font-weight: 800;
    text-decoration: none;
  }

  .profile-biography {
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:-17px;
    color: gray;
    font-size: 17px;
    text-align: left;
    overflow-y: scroll;
  }

  .outer-container {
    margin-top: 10%;
    height: 170px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .inner-container::-webkit-scrollbar {
    display: none;
  }

  .profile {
    margin-top: 5%;
  }

</style>
