<template>
  <div>
    <div class="repo-experience-content">
      <div v-if="!ExperienceDetail">
        <div class="experience-header">
          <p >Experience List</p>
        </div>
        <div class="divider" style="border-top: 1px solid #ddd;margin: 0.2rem 0 0rem 0;"></div>
        <div class="list-group list-experience">
          <li v-for="item in lResult.results" class="list-group-item" :id="'experience'+item.id" @click="expandExperience(item.id)">
            <h4 class="list-group-item-heading">{{item.title}}<router-link :to="{name: 'Profile',params:{author: item.author_name}}">@{{item.author_name}}</router-link></h4>
            <div class="list-group-item-text">{{item.content}}</div>
          </li>
        </div>
        <button class="btn btn-forum" @click="$router.push({name:'ExperienceNew'})">Share Your Experience</button>
      </div>
      <router-link :to="{name:'ExperienceList'}" v-if="ExperienceDetail">Back</router-link>
      <div v-if="ExperienceDetail" v-html="eResult.content.text">
      </div>
      <div v-if="ExperienceDetail">
        <form>
          <button class="btn btn-forum" @click.prevent="submitPost">Submit Your Post</button>
          <textarea v-model="postContent"></textarea>
        </form>
        <div class="postContainer" v-for="item in eResult.post_set">
          <div>{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../../assets/css/editormd.css'
  import marked from 'marked'
  export default {
    data () {
      return {
        ExperienceDetail: false,
        eResult: null,
        lResult: {},
        postContent: ''
      }
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
          this.loadPost(0, 5)
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
        let item = null
        axios.get(`/api/forum/experiences/${id}/`).then((response) => {
          document.querySelector('#experience' + id + ' .list-group-item-text').innerHTML = marked(response.data.content.text)
        })
      },
      submitPost () {
        axios.post('/api/forum/posts/', {
          experience_id: this.$route.params.id,
          content: this.postContent
        }).then((response) => {
          console.log(response)
        })
      },
      loadPost (page, count) {
        let waitForLoad = []
        let i = page * count
        let postCount = this.eResult.post_set.length
        while ((i < (page + 1) * count) && (i < postCount)) {
          waitForLoad.push(axios.get(this.eResult.post_set[i]))
          i++
        }
        console.log(waitForLoad)
      }
    }
  }
</script>