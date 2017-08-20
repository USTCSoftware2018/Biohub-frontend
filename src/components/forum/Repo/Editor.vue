<template>
  <div class="repo-experience-content">
    <form class="biohub-form" style="padding-left:0;padding-right:0;"><input
      class="form-control " placeholder="Title here..." v-model="title"></form>
    <div id="editormd">
      <textarea style="display:none;">### Hello Editor.md !</textarea>
    </div>
    <button class="btn btn-forum" @click="submit">Submit</button>
    <button class="btn" style="background-color:#EB7F00;color: white;" @click="$router.push({name:'ExperienceList'})">Cancel</button>
  </div>
</template>

<script>
  import '../../../assets/css/editormd.css'
  import '../../../utils/editormd.js'
  var editor = null
  export default {
    data () {
      return {
        experienceHTML: '',
        title: ''
      }
    },
    mounted () {
      let _this = this
      $(function () {
        editor = editormd('editormd', {
          path: '/static/lib/',
          pluginPath: '/static/plugins/',
          mode: 'markdown',
          autoHeight: true,
          toolbarAutoFixed: false,
          toolbarIcons: 'biohub',
          htmlDecode: true,
          saveHTMLToTextarea: true
        })
        editor.unwatch()
      })
    },
    methods: {
      submit () {
        console.log(editor.getHTML())
        axios.post('/api/forum/experiences/', {
          brick_id: this.$route.params.repo,
          content_data: {
            text: editor.getHTML(),
            file_ids: []
          },
          title: ''
        }).then((response) => {
          console.log(response)
          this.$router.push({name: 'RepoExperience', params: { id: response.data.id }})
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>