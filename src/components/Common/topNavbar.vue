<template>
  <nav class="navbar navbar-biohub">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Brand</a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="/forum">Forums</a></li>
        <li><a href="/plugins">Plugins</a></li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
      </form>
      <ul class="nav navbar-nav navbar-right navbar-biohub-toggle">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">
            <span class="navbar-avatar">
              <img src="https://www.gravatar.com/avatar/d8cc2ce518e0df9a75316d124c2fc057?s=328&r=g&d=identicon">
            </span>
            {{ userName }}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Log Out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      userName: function () {
        return 'Gloit'
      }
    }
  }
</script>
