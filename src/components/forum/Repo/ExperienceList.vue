<template>
  <div>
    <div class="repo-experience-content">
      <h4 class="experience-list-header">{{experiencesNum}} Experience(s)</h4>
      <div class="divider" style="width: 100%; margin: 5px 0;"></div>
      <div class="list-group list-experience">
        <li v-for="(item, index) in experiencesSet" class="list-group-item" :id="'experience'+item.id">
          <div class="experience-header">
            <img :src="item.author.avatar_url" style="width: 30px;"></span>
            <router-link :to="{name: 'profile',params:{user: item.author_name}}" class="experience-author-name">{{item.author_name}}</router-link>
          </div>
          <div class="list-group-item-text" v-html="item.content.text"></div>
          <div class="action-bar">
            <button class="btn btn-forum" @click="upvote(item.id, index)" :id='"upvoteButton" + item.id' v-bind:class=
              "{'hasVoted':experiencesSet[index].voted, 'cannotVote': (item.author_name === $root.user.username)}">
            <span v-if="!experiencesSet[index].voted"><i class="fa fa-angle-up"></i></span>
            <span v-else><i class="fa fa-angle-down"></i></span> {{item.up_vote_num}}</button>
            <a @click='showPosts(item.id)' style="margin-left: 15px;"><i class="fa fa-comment-o"></i> {{experiencesSet[index].posts_num}} Comment(s)</a>
            <a style="margin-left: 15px;" data-toggle="collapse" :href="'#file' + item.id" aria-expanded="false" :aria-controls="'file' + item.id"><i class='fa fa-download'></i> Files</a>
            <div class="collapse" :id="'file' + item.id">
              <ul class="list-group">
                <li v-for='i in item.content.files' class='list-group-item'><a :href='i.file'>{{i.file}}</a></li>
              </ul>
            </div>
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
        experienceNext: null,
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
      upvote (id, index) {
        if (!this.experiencesSet[index].voted) {
          axios.post(`/api/forum/experiences/${id}/vote/`).then(() => {
            this.experiencesSet[index].voted = true
          })
        } else {
          axios.post(`/api/forum/experiences/${id}/unvote/`).then(() => {
            this.experiencesSet[index].voted = false
          })
        }
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
