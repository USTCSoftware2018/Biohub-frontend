<template>
  <div class="tab-pane active in fade">
    <user-list :api="api"></user-list>
  </div>
</template>

<script>
  import UserList from '@/components/forum/User/UserList'

  export default {
    props: ['user'],
    components: { UserList },
    computed: {
      api () {
        return `/api/users/n:${this.user.username}/followers/`
      }
    }
  }
</script>
