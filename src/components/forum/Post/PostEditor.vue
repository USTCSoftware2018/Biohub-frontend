<template>
  <div>
    <form class="post-form" @submit.prevent="submit">
      <input type="text" class="textarea" v-model="content">
      <button class="btn btn-forum" type="submit" :disabled="!content">Comment</button>
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
        }).catch(e => {
          if (e.response.status === 429) {
            alert('You comment too fast!\nTwo comments should have an interval of at least 15 seconds.')
          }
        })
      }
    }
  }
</script>
