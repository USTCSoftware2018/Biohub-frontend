<template>
<div>
  <img src="../assets/img/bioLogo.png" width="530px" style="padding-top: 10em;">
   <div class="container">
     <div class="row">
         <div class="col-md-3"></div>
         <div class="col-md-6" style="padding-left:20px;padding-right:20px;">
             <form style="margin-top:50px;" class="biohub-form">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
                <input type="text" class="form-control" ref="emailInput" id="emailInput" placeholder="E-mail Address" v-model="usermail">
                </div>
              <button class="btn btn-success btn-reset">Send Verification Code</button>
              <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class=" fa fa-fw fa-question-circle"></i></div>
                <input type="text" class="form-control"  placeholder="Verification Code">
              </div>
            </div>
              <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                <input type="password" class="form-control" ref="passwordInput" id="passwordInput"
                       placeholder="NewPassword" v-model="password">
              </div>
              <button type="submit" class="btn btn-biohub btn-biohub-blue full-width" style="margin-top:10px">Submit</button>
            </div>
             </form>
         </div>
     </div>
   </div>
</div>
</template>
<script>

</script>
<style scoped>
@import  "forum/Common/Common.css";

  .btn-reset {
    margin-top:10px;
    margin-bottom:10px;
  }
</style>
