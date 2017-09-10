<template>
  <div>
    <div class="repo-info-content" v-html="rContent">
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    props: ['content'],
    data () {
      return {
        rContent: marked(this.content.text)
      }
    },
    mounted () {
      console.log(this.rContent)
    }
  }
</script>
