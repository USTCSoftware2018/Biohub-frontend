<template>
  <div class="col-md-12">
    <form class="biohub-form" @submit.prevent="submit">
      <input class="form-control " placeholder="Title here..." v-model="title">
      <div id="editormd" style="margin-top: 10px;">
        <textarea v-model="content"></textarea>
      </div>
      <div class="form-group clearfix">
        <button class="btn btn-forum pull-right">Post</button>
      </div>
    </form>
    <upload-button @upload-start="uploadStart"></upload-button>
    <div class="editor-files-list" v-if="files.length > 0 || filesUploading.length > 0">
      <div v-for="file in filesUploading">
        {{ file.name }} {{ file.progress * 100 + '%' }}
        <button class="btn btn-forum" @click="file.cancel" v-if="!file.done">Cancel</button>
      </div>
      <div v-for="(file, index) in files" class="editor-files-list-item">
        <a :href="file.file" target="_blank">{{ file.name }}</a>
        <button class="btn btn-forum" @click="files.splice(index, 1)">Remove</button>
        <button class="btn btn-forum" @click="insertImage(file)" v-if="file.mime_type.indexOf('image') >= 0">
          Insert
        </button>
      </div>
    </div>
  </div>
</template>

<style>

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
      this.init(to)
      next()
    },
    created () {
      this.editorLoaded.promise = new Promise(resolve => {
        this.editorLoaded.resolve = resolve
      })
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
          brick_name: this.$route.params.repo,
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
              this.files = data.content.files
              this.editorLoaded.promise
                .then(() => {
                  this.editor.setMarkdown(this.content = data.content.text)
                })
            })
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
