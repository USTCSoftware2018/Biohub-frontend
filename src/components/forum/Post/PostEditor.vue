<template>
  <div>
    <form class="postForm" @submit.prevent="submit">
      <input type="text" class="textarea" v-model="content">
      <button class="btn btn-forum">Comment</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['expId'],
    data () {
      return {
        content: ''
      }
    },
    methods: {
      submit () {
        return axios.post('/api/forum/posts/', {
          experience_id: this.expId,
          content: this.content
        }).then(response => {
          this.content = ''
          this.$emit('created', response.data)
        })
      }
    }
  }
</script>
