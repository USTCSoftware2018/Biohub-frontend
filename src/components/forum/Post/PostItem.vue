<template>
  <div class="post-item">
    <div class="post-author">
      <router-link :to="{ name: 'profile', params: { user: post.author.username }}">
        <img :src="post.author.avatar_url" alt="">
        {{ post.author.username }}
      </router-link>
      <small class="timeago text-muted" :datetime="post.update_time" ref="update_time"></small>
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
    }
  }
</script>
