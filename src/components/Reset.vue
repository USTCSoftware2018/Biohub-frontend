<template>
<div>
   <img src="../assets/img/brand.png" width="530px" style="padding-top: 5em;">
   <div class="container">
     <div class="row">
         <div class="col-md-3"></div>
         <div class="col-md-6" style="padding-left:20px;padding-right:20px;">
             <form style="margin-top:50px;" class="biohub-form">
              <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-address-card fa-fw"></i></div>
                <input type="text" class="form-control" ref="emailInput" id="emailInput" placeholder="E-mail Address"
                       list="mail_list" v-model="usermail">
                
              </div>
              <button style="margin-top: 10px">Send Verification Code</button>
             </form>
         </div>
     </div>
   </div>
</div>  
</template>
<script>

</script>
<style scoped>
</style>