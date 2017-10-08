<template>
  <div class="repo-experience-content">
    <form class="biohub-form" style="padding-left:0;padding-right:0;"><img :src="$root.user.avatar"><input
      class="form-control " placeholder="Title here..." v-model="title"></form>
    <div id="editormd">
      <textarea style="display:none;">Hello World!</textarea>
    </div>
    <button class="btn btn-forum" @click.prevent="Submit">Submit</button>
    <button type="button" class="btn btn-forum" data-toggle="modal" data-target="#uploadFile">
      Upload Files
    </button>
    <div class="modal fade" id="uploadFile" tabindex="-1" role="dialog" aria-labelledby="uploadFileLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Upload a File</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for='inputFile'>Select a file:</label>
                <input type='file' id='inputFile'>
              </div>
            </form>
            <p class="text-success" v-if='uploadStatus === 1'><i class="fa fa-check"></i> {{filename}} had been successively uploaded to the server.</p>
            <p class="text-danger" v-if='uploadStatus === 2'><i class="fa fa-close"></i> {{filename}} had not been uploaded.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-forum" @click='uploadFile'>Submit</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
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
        title: '',
        files: [],
        uploadStatus: 0,
        filename: ''
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
            file_ids: this.files
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
      },
      uploadFile () {
        var uFile = document.getElementById('inputFile').files[0]
        console.log(uFile)
        this.filename = uFile.name
        var formData = new FormData()
        formData.append('file', uFile)
        axios.post('/files/upload/?store_db=1', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
          console.log(response)
          this.files.push(response.data.id)
          this.uploadStatus = 1
        }).catch((e) => {
          console.log(e)
          this.uploadStatus = 2
        })
      }
    }
  }
</script>
