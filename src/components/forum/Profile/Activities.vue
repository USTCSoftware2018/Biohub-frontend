<template>
  <div class="tab-pane fade in active">
    <activity-list :api="apiUrl"></activity-list>
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
    }
  }
</script>
