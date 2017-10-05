<template>
  <div class="tab-pane fade in active">
    <activity-list :api="apiUrl" ref="list"></activity-list>
  </div>
</template>

<script>
  import ActivityList from '@/components/forum/Activity/ActivityList'

  export default {
    props: ['user'],
    components: {ActivityList},
    computed: {
      apiUrl () {
        return `/api/forum/activities/?user=${this.user.username}`
      }
    },
    watch: {
      'user' (newVal, oldVal) {
        if (newVal.username !== oldVal.username) {
          this.$refs.list.refresh()
        }
      }
    }
  }
</script>
