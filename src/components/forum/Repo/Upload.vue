<template>
  <form class="upload-form" ref="form">
    <div class="upload-button btn btn-forum">
      <input type="file" name="file" @change="fileChanged" ref="input">
      Attachments
    </div>
  </form>
</template>

<script>
  import Vue from 'vue'

  function UploadingFile (rawFileObject, promise, cancelSource, vm) {
    this._rawFile = rawFileObject
    this.promise = promise
    this.name = rawFileObject.name
    this.id = String(Date.now())
    this._cancelSource = cancelSource
    this._vm = new Vue()
  }

  UploadingFile.prototype.on = function (name, cb) {
    this._vm.$on(name, cb)
    return this
  }

  UploadingFile.prototype.cancel = function () {
    this._cancelSource.cancel()
  }

  export default {
    props: {
      api: {
        type: String,
        default: '/files/upload/?store_db=1'
      }
    },
    methods: {
      fileChanged (...rest) {
        const files = this.$refs.input.files
        if (!files.length) return

        const rawFile = files[0]
        const cancelSource = axios.CancelToken.source()

        const formData = new FormData()
        formData.append('file', rawFile)

        let uploadingFile
        const promise = axios.post(this.api, formData, {
          cancelToken: cancelSource.token,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: ({ total, loaded }) => {
            uploadingFile._vm.$emit('upload-progress', loaded / total)
          }
        }).then(response => {
          uploadingFile._vm.$emit('upload-finished', response.data)
        }).catch(thrown => {
          if (axios.isCancel(thrown)) {
            uploadingFile._vm.$emit('upload-canceled')
          } else {
            uploadingFile._vm.$emit('upload-error', thrown)
          }
        })

        this.$emit(
          'upload-start',
          uploadingFile = new UploadingFile(rawFile, promise, cancelSource)
        )
        this.$refs.form.reset()
      }
    }
  }
</script>
