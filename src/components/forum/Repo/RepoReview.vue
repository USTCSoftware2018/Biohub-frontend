<template>
  <div class="repo-experience-content">
    <div class="experience-header">
      <button class="btn btn-forum" @click="$router.push({name:'ExperienceNew'})">Share Your Experience</button>
        <input class="experience-search" placeholder="search">
    </div>
    <div class="divider" style="border-top: 1px solid #ddd;margin-top: 2rem;"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Editor from './Editor.vue'
  var opentext = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore'
  var closetext = 'Lorem ipsum dolor sit amet'
  export default {
    data () {
      return {

      }
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
    },
    components: {
      Editor
    },
    methods: {
      loadMoreOrCollapse: function (id) {
        var ele = $('#experience-' + id + ' .list-group-item-text')
        console.log(ele, ele[0].hasAttribute('on'))
        if (!(ele[0].hasAttribute('on'))) {
          ele.html(opentext + '<br>Hide Detail')
          ele[0].setAttribute('on', '1')
          console.log('1')
        } else {
          ele.html(closetext + '<br>Show Detail')
          ele[0].removeAttribute('on')
          console.log('2')
        }
      }
    }
  }
</script>