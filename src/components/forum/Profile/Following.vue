<template>
  <div class="tab-pane active in fade">
    <user-list :api="api" ref="list"></user-list>
  </div>
</template>

<script>
  import UserList from '@/components/forum/User/UserList'

  export default {
    props: ['user'],
    components: { UserList },
    computed: {
      api () {
        return `/api/users/n:${this.user.username}/following/`
      }
    },
    watch: {
      '$route' () {
        this.$refs.list.loadUsers()
      }
    }
  }
</script>
