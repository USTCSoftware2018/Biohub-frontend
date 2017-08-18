<template>
  <div>
    <div class="repo-experience-content">
      <div v-if="!ExperienceDetail">
        <div class="experience-header">
          <button class="btn btn-forum" @click="$router.push({name:'ExperienceNew'})">Share Your Experience</button>
        </div>
        <div class="divider" style="border-top: 1px solid #ddd;margin: 0.2rem 0 0rem 0;"></div>
        <div class="list-group list-experience">
          <li v-for="item in lResult.results" class="list-group-item" :id="'experience'+item.id" @click="expandExperience(item.id)">
            <h4 class="list-group-item-heading">{{item.title}}<a href="#">@{{item.author_name}}</a></h4>
            <div class="list-group-item-text">{{item.content}}</div>
          </li>
        </div>
      </div>
      <div v-if="ExperienceDetail" v-html="eResult.content.text">
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
        lResult: {}
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
        if (to.id || from.id) {

        }
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
        let item = null
        for (item in this.lResult.results) {
          if (this.lResult.results[item].id === id) {
            console.log('id' + id + 'clicked.')
          }
        }
      }
    }
  }
</script>