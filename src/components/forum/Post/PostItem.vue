<template>
  <div class="post-item">
    <div class="post-author">
      <router-link :to="{ name: 'profile', params: { user: post.author.username }}">
        <img :src="post.author.avatar_url" alt="">
        {{ post.author.username }}
      </router-link>
      <small class="timeago text-muted pull-right" :datetime="post.update_time" ref="update_time"></small>
      <a href="javascript:;" class="tool" v-if="isMine" @click="deletePost">Delete</a>
    </div>
    <div class="post-content">
      {{ post.content }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['post'],
    mounted () {
      timeago().render(this.$refs.update_time)
    },
    computed: {
      isMine () {
        return this.$root.user && this.$root.user.username === this.post.author.username
      }
    },
    methods: {
      deletePost () {
        if (confirm('Are you sure to delete?')) {
          axios.delete(`/api/forum/posts/${this.post.id}/`)
            .then(() => {
              alert('Successfully deleted!')
              this.$emit('deleted', this)
            })
        }
      }
    }
  }
</script>
