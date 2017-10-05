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
      <follow-button :user="user"></follow-button>
    </div>
  </div>
</template>

<script>
  import FollowMixin from './FollowMixin'
  export default {
    mixins: [FollowMixin],
    props: ['user']
  }
</script>
