<template>
  <div class="user-item">
    <div class="user-left">
      <img :src="user.avatar_url" class="media-object">
    </div>
    <div class="user-body">
      <router-link :to="{ name: 'profile', user: user.username }">
        <h4 class="media-heading">{{ user.username }}</h4>
      </router-link>
    </div>
    <div class="user-right" v-if="user.followed !== undefined" :disabled="toggling">
      <button class="btn" @click="toggleRelation">
        {{ user.followed ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        toggling: false
      }
    },
    props: ['user'],
    methods: {
      toggleRelation () {
        if (this.toggling) return

        let action = this.user.followed ? 'unfollow' : 'follow'
        let url = `/api/users/n:${this.user.username}/${action}/`
        this.toggling = true
        axios.post(url)
          .then(response => {
            this.user.followed = !this.user.followed
          }).always(() => {
            this.toggling = false
          })
      }
    }
  }
</script>
