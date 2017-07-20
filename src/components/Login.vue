<template>
  <div class="container" style="min-width:1200px;">
    <div class="row">
      <div class="col-xs-8 ">
        <img src="../assets/logo.png">
      </div>
      <div class="col-xs-4">
        <form style="margin-top:50px;" class="biohub-form">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
              <input type="text" class="form-control" id="usernameInput" placeholder="Username">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
              <input type="password" class="form-control" id="passwordInput" placeholder="Password">
            </div>
          </div>
          <button type="submit" class="btn btn-default btn-biohub">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login'
  }
</script>