<template>
  <div class="profile">
    <div class="container">
      <div class="col-md-3 profile-left">
        <div class="profile-avatar-container">
          <div class="profile-avatar">
            <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=328&r=g&d=identicon">
          </div>
        </div>
        <div class="author-info">
          <div id="author-name"> {{ $route.params.author }} </div>
          <div id="author-mail">gloit042@gmail.com</div>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-7 ">
        <div class="profile-tab">
          About me
        </div>
        <div class="profile-biography-frame">
          <div class="outer-container">
            <div class="profile-biography">
              {{ biography }}
            </div>
          </div>
        </div>
        <div class="activity-banner">
          <span>
            Acitivity
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var biography = 'Lorem ipsum dolor sit amet, eos ei mnesarchum moderatius, ea qui aeque ridens graeci. Cum suas sale aliquando ex, mel latine sapientem cu, sumo iusto gloriatur qui an. In mel prima corpora delectus, quo periculis vituperata efficiantur ut, no usu simul soleat. No dicant tantas hendrerit pro, cum ei mandamus elaboraret, sint salutandi vituperatoribus vim an.\n' +
    'Vis eu nibh omnis.'
  export default {
    data () {
      return {
        biography: biography
      }
    }
  }
</script>

<style>
  .author-info {
    text-align: left;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
  }

  #author-name {
    font-size: 40px !important;
  }

  #author-mail {
    color: gray;
    font-size: 14px !important;
  }

  .profile-tab {
    margin-top: 2%;
    width: 100px;
    padding: 5px 0 5px 0;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #ddd;
    border-bottom: 0px;
  }

  .activity-banner {
    margin-top: 22px;
    font-size: 34px;
  }

  .profile-biography-frame {
    background: white;
    padding: 10px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: 1px solid #ddd;
  }

  .profile-biography {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px;
    font-size: 14px;
    text-align: left;
    overflow-y: scroll;
  }

  .outer-container {
    height: 140px;
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
