<template>
  <div id="editormd">
    <textarea style="display:none;">### Hello Editor.md !</textarea>
  </div>
</template>

<script>
  import '../../../assets/css/editormd.css'
  import '../../../editormd/editormd.js'
  export default {
    mounted () {
      $(function () {
        var editor = editormd('editormd', {
          path: '/static/lib/',
          pluginPath: '/static/plugins',
          mode: 'markdown',
          autoHeight: true,
          toolbarAutoFixed: false,
          toolbarIcons: 'biohub',
          htmlDecode: true
        })
        editor.unwatch()
      })
    }
  }
</script>