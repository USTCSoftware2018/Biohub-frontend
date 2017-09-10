<template>
  <div>
    <div class="repo-experience-content">
      <div v-if="!ExperienceDetail">
        <div class="experience-header">
          <p >Experience List</p>
        </div>
        <div class="divider" style="border-top: 1px solid #ddd;margin: 0.2rem 0 0rem 0;"></div>
        <div class="list-group list-experience">
          <li v-for="item in lResult.results" class="list-group-item" :id="'experience'+item.id">
            <h4 class="list-group-item-heading" @click="expandExperience(item.id)">{{item.title}}<router-link :to="{name: 'Profile',params:{author: item.author_name}}">@{{item.author_name}}</router-link></h4>

            <div class="list-group-item-text">{{item.content}}</div>
            <a class='biohub-a' v-show="expandedExperience['key' + item.id]" @click="showPost(item.id)" :id="'postSwitch' + item.id">Show Posts</a>
            <post-list :id="item.id" v-if="showPosts['key' + item.id]"></post-list>
            <form class="postForm" v-if="showPosts['key' + item.id]">
              <div v-model="postContent" class="textarea" contenteditable="true" :id="'postContent' + item.id"></div>
              <button class="btn btn-forum" @click.prevent="submitPost(item.id)">Submit Your Post</button>
            </form>
          </li>
        </div>
        <button class="btn btn-forum" @click="$router.push({name:'ExperienceNew'})">Share Your Experience</button>
      </div>
      <router-link :to="{name:'ExperienceList'}" v-if="ExperienceDetail" class="biohub-a"><i class="fa fa-angle-left"></i> Back</router-link>
      <div v-if="ExperienceDetail" v-html="eResult.content.text">
      </div>
      <div v-if="ExperienceDetail">
        <form class="postForm">
          <div v-model="postContent" class="textarea" contenteditable="true" id="postContent"></div>
          <button class="btn btn-forum" @click.prevent="submitPost">Submit Your Post</button>
        </form>
        <post-list :id="$route.params.id"></post-list>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../../assets/css/editormd.css'
  import marked from 'marked'
  import PostList from './PostsList.vue'
  import Bus from '../../../utils/bus'
  import Star from '../../../utils/Star.vue'
  export default {
    data () {
      return {
        ExperienceDetail: false,
        eResult: null,
        lResult: {},
        postContent: '',
        loadedPost: [],
        page: 0,
        count: 5,
        postNoMore: false,
        showPosts: {},
        expandedExperience: {}
      }
    },
    components: {
      PostList, Star
    },
    mounted () {
      if (this.$route.params.id) {
        this.loadExperience(this.$route.params.id)
      } else {
        this.loadExperienceList()
      }
    },
    watch: {
      '$route.params' (to, from) {
        console.log(to, from)
        this.$router.go(0)
      }
    },
    methods: {
      loadExperience (id) {
        axios.get(`/api/forum/experiences/${id}/`).then((response) => {
          console.log(response)
          this.ExperienceDetail = true
          this.eResult = response.data
          this.eResult.content.text = marked(this.eResult.content.text)
        }).catch((error) => {
          console.log(error)
        })
      },
      loadExperienceList () {
        axios.get(`/api/forum/bricks/${this.$route.params.repo}/experiences/?short=true`).then((response) => {
          console.log(response)
          this.lResult = response.data
          this.ExperienceDetail = false
        }).catch((error) => {
          console.log(error)
        })
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
          Bus.$emit('newPost', response.data)
          document.querySelector('#postContent').innerText = ''
          this.postContent = ''
        })
      },
      showPost (id) {
        if (this.showPosts['key' + id]) {
          this.$set(this.showPosts, 'key' + id, false)
          document.querySelector('#postSwitch' + id).innerHTML = 'Show Posts'
        } else {
          this.$set(this.showPosts, 'key' + id, true)
          document.querySelector('#postSwitch' + id).innerHTML = 'Hide Posts'
        }
      }
    }
  }
</script>
