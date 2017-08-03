<template>
  <div>
    <div class="repo-experience-content">
      <div class="experience-header">
        <button class="btn btn-forum" @click="$router.push({name:'ExperienceNew'})">Share Your Experience</button>
        <input class="experience-search" placeholder="search">
      </div>
      <div class="divider" style="border-top: 1px solid #ddd;margin-top: 2rem;"></div>
      <div class="list-group list-experience">
        <router-link :to="{name: 'RepoExperience', params:{id: 1}}" class="list-group-item" id="experience-1">
          <h4 class="list-group-item-heading">List group item heading<a href="#">@sdfg</a> <small>2017.1.1</small>
          <div class="pull-right list-group-item-addon">star:13423</div></h4>
          <p class="list-group-item-text"># TEST <br> Lorem ipsum...<br> View Detail</p>
        </router-link>
        <router-link :to="{name: 'RepoExperience', params:{id: 2}}" class="list-group-item" id="experience-2">
          <h4 class="list-group-item-heading">List group item heading<a href="#">@sdfg</a></h4>
          <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et doloremagna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
        . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <br>Hide Detail</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  var opentext = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore'
  var closetext = 'Lorem ipsum dolor sit amet'
  export default {
    mounted () {
    },
    watch: {
      '$route' (to, from) {
        console.log(to, from)
        if (to.params.id) {
          var eleT = $('#experience-' + to.params.id + ' .list-group-item-text')
          eleT.html(opentext + '<br>Hide Detail')
          eleT[0].setAttribute('on', '1')
        }
        if (from.params.id) {
          var eleF = $('#experience-' + from.params.id + ' .list-group-item-text')
          eleF.html(closetext + '<br>Show Detail')
          eleF[0].removeAttribute('on')
        }
      }
    }
  }
</script>