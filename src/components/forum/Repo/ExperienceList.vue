<template>
  <div>
    <div class="repo-experience-content">
      <h4 class="experience-list-header">{{experiencesNum}} Experience(s)</h4>
      <div class="divider" style="width: 100%; margin: 5px 0;"></div>
      <div class="list-group list-experience">
        <li v-for="(item, index) in experiencesSet" class="list-group-item" :id="'experience'+item.id">
          <div class="experience-header">
            <img :src="item.author.avatar_url" style="width: 30px;"></span>
            <router-link :to="{name: 'Profile',params:{author: item.author_name}}" class="experience-author-name">{{item.author_name}}</router-link>
          </div>
          <div class="list-group-item-text" v-html="item.content.text"></div>
          <div class="action-bar">
            <button class="btn btn-forum" @click="upvote(item.id)" :id='"upvoteButton" + item.id' v-bind:class=
              "{'hasVoted':experiencesSet[index].voted, 'cannotVote': (item.author_name === $root.user.username)}">
            <span v-if="!experiencesSet[index].voted"><i class="fa fa-angle-up"></i></span>
            <span v-else><i class="fa fa-angle-down"></i></span> {{item.up_vote_num}}</button>
            <a @click='showPosts(item.id)' style="margin-left: 15px;"><i class="fa fa-comment-o"></i> {{experiencesSet[index].posts_num}} Comment(s)</a>
            <posts-list :expId="item.id" :ref='"comments"+item.id'></posts-list>
          </div>
        </li>
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
    <div class="documentClick" v-if="experienceNext!==null" @click='loadMore'>
        Load More Experience
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
  import Star from '../../../utils/Star.vue'
  import PostsList from './PostsList'
  export default {
    data () {
      return {
        eResult: null,
        lResult: {},
        postContent: '',
        hasUpvote: {},
        experiencesSet: [],
        experienceNext: '',
        experiencesNum: 0
      }
    },
    props: ['brickID'],
    components: {
      PostsList,
      Star
    },
    created () {
      axios.get(`/api/forum/bricks/${this.brickID}/experiences/`).then((response) => {
        this.experiencesNum = response.data.count
        this.experiencesSet = response.data.results
        this.experienceNext = response.data.next
      }).catch((e) => {
      })
    },
    watch: {
      '$route.params' (to, from) {
        console.log(to, from)
        this.$router.go(0)
      }
    },
    methods: {
      showPosts (id) {
        this.$refs['comments' + id][0].switch()
      },
      upvote (id) {
        this.$store.dispatch('upVote', id)
      },
      loadMore () {
        axios.get(this.experienceNext).then((response) => {
          this.experiencesSet = this.experiencesSet.concat(response.data.results)
          this.experienceNext = response.data.next
        }).catch((e) => {
        })
      }
    }
  }
</script>
