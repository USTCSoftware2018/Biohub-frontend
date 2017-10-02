<template>
  <div class="repo-experience-content">
    <form class="biohub-form" style="padding-left:0;padding-right:0;"><img :src="$root.user.avatar"><input
      class="form-control " placeholder="Title here..." v-model="title"></form>
    <div id="editormd">
      <textarea style="display:none;">Hello World!</textarea>
    </div>
    <button class="btn btn-forum" @click.prevent="Submit">Submit</button>
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
      $(function () {
        editor = editormd('editormd', {
          path: '/static/lib/',
          pluginPath: '/static/plugins/',
          mode: 'markdown',
          autoHeight: true,
          autoFocus: false,
          toolbarAutoFixed: false,
          toolbarIcons: 'biohub',
          htmlDecode: true,
          saveHTMLToTextarea: true
        })
        editor.unwatch()
      })
    },
    methods: {
      Submit () {
        console.log(editor.getHTML())
        axios.post('/api/forum/experiences/', {
          brick_name: this.$route.params.repo,
          content: {
            text: editor.getHTML(),
            file_ids: []
          },
          title: this.title
        }).then((response) => {
          console.log(response)
          this.$router.push({name: 'Exp', params: { id: response.data.id }})
        }).catch((error) => {
          console.log(error)
        })
      },
      Focus () {
        editor.focus()
      }
    }
  }
</script>
