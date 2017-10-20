<template>
  <div class="col-md-12">
    <form class="biohub-form" @submit.prevent="submit">
      <input class="form-control " placeholder="Title here..." v-model="title">
      <div id="editormd" style="margin-top: 10px;">
        <textarea v-model="content"></textarea>
      </div>
      <div class="form-group" v-if="errorMessage">
        <div class="alert alert-danger" v-html="errorMessage"></div>
      </div>
      <div class="form-group clearfix">
        <button class="btn btn-forum pull-right">Post</button>
      </div>
    </form>
    <upload-button @upload-start="uploadStart"></upload-button>
    <div class="editor-files-list col-md-12" v-if="files.length || filesUploading.length">
      <div v-for="file in filesUploading" class="col-md-6">
        {{ file.name }} {{ file.progress * 100 + '%' }}
        <button class="btn btn-forum" @click="file.cancel" v-if="!file.done">Cancel</button>
      </div>
      <div v-for="(file, index) in files" class="editor-files-list-item col-md-6 clearfix">
        <a :href="file.file" target="_blank">{{ file.name }}</a>
        <button class="btn btn-forum pull-right" @click="files.splice(index, 1)">Remove</button>
        <button class="btn btn-forum pull-right" @click="insertImage(file)" v-if="file.mime_type.indexOf('image') >= 0">
          Insert
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .biohub-form {
    padding-left: 0;
    padding-right: 0;
  }

  .editor-files-list-item a {
    font-size: 20px;
  }
</style>

<script>
  import '../../../assets/css/editormd.css'
  import '../../../utils/editormd.js'
  import '../../../utils/editormd.lang.en.js'
  import UploadButton from './Upload'

  export default {
    components: {UploadButton},
    data () {
      return {
        title: '',
        content: '',
        files: [],
        filesUploading: [],
        uploadStatus: 0,
        editor: null,
        expId: null,
        errorMessage: '',
        editorLoaded: {
          promise: null,
          resolve: null
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.init(to))
    },
    beforeRouteUpdate (to, from, next) {
      if (this.title || this.content) {
        if (!window.confirm('Current experience was not saved, are you sure to start a new one?')) {
          next(false)
          return
        }
      }
      this.init(to)
      next()
    },
    created () {
      this.editorLoaded.promise = new Promise(resolve => {
        this.editorLoaded.resolve = resolve
      })
    },
    mounted () {
      /* eslint-disable no-undef */
      const staticPath = staticBase
      this.editor = editormd('editormd', {
        path: `${staticPath}lib/`,
        pluginPath: `${staticPath}plugins/`,
        height: '500px',
        autoFocus: false,
        toolbarAutoFixed: false,
        toolbarIcons: 'biohub',
        htmlDecode: true,
        saveHTMLToTextarea: false,
        onload: () => {
          this.editorLoaded.resolve()
        }
      })
    },
    methods: {
      submit () {
        const data = {
          title: this.title,
          brick_name: this.$route.params.brick,
          content_input: {
            text: this.editor.getMarkdown(),
            file_ids: this.files.map(o => o.id)
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
              brick: response.data.brick,
              id: response.data.id
            }
          })
        }).catch(({ response }) => {
          switch (response.status) {
            case 429:
              this.errorMessage = 'Each user can post only ONE experience under one brick per day.'
              break
            case 400:
              const error = response.data
              const results = []

              if (error.title) results.push('<b>Title:</b><br>' + error.title.join('<br>'))
              const content = response.data.content_input
              if (content && content.text) {
                results.push('<b>Content:</b><br>' + content.text.join('<br>'))
              }

              this.errorMessage = results.join('<br>')

              break
          }
        })
      },
      init (to) {
        let expId = to.query.expId
        this.expId = expId = parseInt(expId) || null

        if (expId) {
          axios.get(`/api/forum/experiences/${expId}/`)
            .then(({ data }) => {
              if (!data.author || data.author.username !== this.$root.user.username) {
                this.to404()
                return
              }
              this.title = data.title
              this.files = data.content.files
              this.editorLoaded.promise
                .then(() => {
                  this.editor.setMarkdown(this.content = data.content.text)
                })
            })
        } else {
          this.title = ''
          this.editorLoaded.promise
            .then(() => {
              this.editor.setMarkdown(this.content = '')
            })
          this.files = []
          this.uploadingFile = []
        }
      },
      uploadStart (uploadingFile) {
        const file = {
          name: uploadingFile.name,
          done: false,
          progress: 0,
          cancel: uploadingFile.cancel.bind(uploadingFile),
          id: uploadingFile.id
        }
        const done = () => {
          file.done = true
          _.remove(this.filesUploading, o => o.id === file.id)
        }
        this.filesUploading.splice(0, 0, file)

        uploadingFile
          .on('upload-progress', p => {
            file.progress = p
          })
          .on('upload-canceled', done)
          .on('upload-error', done)
          .on('upload-finished', fileObject => {
            done()
            this.files.splice(0, 0, fileObject)
          })
      },
      insertImage (file) {
        this.editor.insertValue(`![${file.name}](${file.file})`)
      }
    }
  }
</script>
