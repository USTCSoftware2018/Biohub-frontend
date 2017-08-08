<template>
  <div class="repo-experience-content">
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
        experienceHTML: ''
      }
    },
    mounted () {
      let _this = this
      $(function () {
        console.log(this)
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
      }
    }
  }
</script>