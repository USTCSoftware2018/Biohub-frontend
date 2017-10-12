<template>
  <div class="col-md-12">
    <form class="biohub-form" @submit.prevent="submit">
      <input class="form-control " placeholder="Title here..." v-model="title">
      <div id="editormd">
        <textarea v-model="content"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-forum">Post</button>
      </div>
    </form>
  </div>
</template>

<script>
  import '../../../assets/css/editormd.css'
  import '../../../utils/editormd.js'
  import '../../../utils/editormd.lang.en.js'

  export default {
    data () {
      return {
        title: '',
        content: '',
        files: [],
        uploadStatus: 0,
        editor: null,
        expId: null
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.init(to))
    },
    beforeRouteUpdate (to, from, next) {
      this.init(to)
      next()
    },
    mounted () {
      this.editor = editormd('editormd', {
        path: '/static/lib/',
        pluginPath: '/static/plugins/',
        height: '500px',
        autoFocus: false,
        toolbarAutoFixed: false,
        toolbarIcons: 'biohub',
        htmlDecode: true,
        saveHTMLToTextarea: false
      })
    },
    methods: {
      submit () {
        const data = {
          title: this.title,
          content_input: {
            text: this.editor.getMarkdown(),
            files: this.files
          }
        }
        let api

        if (this.expId) {
          api = axios.patch(`/api/forum/experiences/${this.expId}/`, data)
        } else {
          api = axios.post(`/api/forum/experiences/`, data)
        }

        api.then(response => {
          this.$router.push({
            name: 'Exp',
            params: {
              repo: response.data.brick,
              id: response.data.id
            }
          })
        })
      },
      init (to) {
        let expId = to.query.expId
        this.expId = expId = parseInt(expId) || null

        if (expId) {
          axios.get(`/api/forum/experiences/${expId}/`)
            .then(({ data }) => {
              if (!data.author || data.author.username !== this.$root.user.username) {
                this.$router.replace({ name: 'NotFound' })
              }
              this.title = data.title
              this.editor.setMarkdown(this.content = data.content.text)
              this.files = data.files
            })
        }
      }
    }
  }
</script>
