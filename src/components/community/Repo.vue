<template>
  <div>
    <top-navbar></top-navbar>
    <div class="row">
      <div class="container">
        <div class="col-md-9">
          <ul class="nav nav-tabs nav-repo">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Profile</a></li>
            <li role="presentation"><a href="#">Messages</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default panel-biohub">
            <div class="panel-heading">About the author</div>
            <div class="panel-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <ul class="list-group left-list">
            <li class="list-group-header">Devices which use this part...</li>
            <li class="list-group-item"><a href="#">Lorem ipsum dolor sit amet</a></li>
            <li class="list-group-item"><a href="#">consectetur adipisicing elit</a></li>
            <li class="list-group-item"><a href="#">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topNavbar from '../topNavbar.vue'
  export default {
    components: {
      topNavbar
    },
    created () {
      console.log(this.$route.params)
    }
  }
</script>