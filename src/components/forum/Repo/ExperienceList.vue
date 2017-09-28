<template>
  <div>
    <div class="repo-experience-content">
      <div v-if="!ExperienceDetail">
        <h4 class="experience-list-header">{{$store.state.BrickStatus.experienceSet.length}} Experience(s)</h4>
        <div class="divider" style="width: 100%; margin: 5px 0;"></div>
        <div class="list-group list-experience">
          <li v-for="(item, index) in $store.state.BrickStatus.experienceSet" class="list-group-item" :id="'experience'+item.id">
            <div class="experience-header">
              <img :src="item.author.avatar_url" style="width: 30px;"></span>
              <router-link :to="{name: 'Profile',params:{author: item.author_name}}" class="experience-author-name">{{item.author_name}}</router-link>
            </div>
            <div class="list-group-item-text" v-html="item.content.text"></div>
            <div class="action-bar">
              <button class="btn btn-forum" @click="upvote(item.id)" :id='"upvoteButton" + item.id' v-bind:class=
                "{'hasVoted':$store.state.BrickStatus.experienceSet[index].voted, 'cannotVote': (item.author_name === $store.getters.userName)}">
                <span v-if="!$store.state.BrickStatus.experienceSet[index].voted"><i class="fa fa-angle-up"></i></span>
                <span v-else><i class="fa fa-angle-down"></i></span> {{item.up_vote_num}}</button>
              <a :id='"commentsButton" + item.id' @click="showComments(item.id, index)" style="margin-left: 15px;"><i class="fa fa-comment-o"></i>    {{$store.state.BrickStatus.experienceSet[index].posts_num}} Comment(s)</a>
              <post-list class='hide' :id='"comments"+item.id' :expId="item.id"></post-list>
            </div>
          </li>
        </div>
        <!--button class="btn btn-forum" @click="$router.push({name:'ExperienceNew'})">Share Your Experience</button-->
      </div>
      <!--router-link :to="{name:'ExperienceList'}" v-if="ExperienceDetail" class="biohub-a"><i class="fa fa-angle-left"></i> Back</router-link>
      <div v-if="ExperienceDetail" v-html="eResult.content.text">
      </div>
      <div v-if="ExperienceDetail">
        <form class="postForm">
          <div v-model="postContent" class="textarea" contenteditable="true" id="postContent"></div>
          <button class="btn btn-forum" @click.prevent="submitPost">Submit Your Post</button>
        </form>
        <post-list :id="$route.params.id"></post-list>
      </div-->
    </div>
  </div>
</template>
<style>
  .hasVoted {
    background-color: #ccc;
  }
</style>

<script>
  import '../../../assets/css/editormd.css'
  import marked from 'marked'
  import PostList from './PostsList.vue'
  import Star from '../../../utils/Star.vue'
  export default {
    data () {
      return {
        ExperienceDetail: false,
        eResult: null,
        lResult: {},
        postContent: '',
        hasUpvote: {}
      }
    },
    components: {
      PostList, Star
    },
    created () {
      this.$store.dispatch('loadBrick', this.$route.params.repo)
    },
    watch: {
      '$route.params' (to, from) {
        console.log(to, from)
        this.$router.go(0)
      }
    },
    methods: {
      showComments (id, index) {
        let element = document.querySelector('#comments' + id)
        let element2 = document.querySelector('#commentsButton' + id)
        if (element.classList.contains('hide')) {
          element.classList.remove('hide')
          element2.innerHTML = '<i class="fa fa-angle-up"></i> Hide'
        } else {
          element.classList.add('hide')
          element2.innerHTML = '<i class="fa fa-comment-o"></i> ' + this.$store.state.BrickStatus.experienceSet[index].posts_num + ' Comment(s)'
        }
      },
      expandExperience (id) {
        axios.get(`/api/forum/experiences/${id}/`).then((response) => {
          document.querySelector('#experience' + id + ' .list-group-item-text').innerHTML = marked(response.data.content.text)
        })
        this.$set(this.expandedExperience, 'key' + id, true)
        console.log(this.$data)
      },
      submitPost (id) {
        this.postContent = document.querySelector('#postContent' + id).innerText
        console.log(this.postContent)
        axios.post('/api/forum/posts/', {
          experience_id: id,
          content: this.postContent
        }).then((response) => {
          console.log(response)
          document.querySelector('#postContent').innerText = ''
          this.postContent = ''
        })
      },
      upvote (id) {
        this.$store.dispatch('upVote', id)
      }
    }
  }
</script>
