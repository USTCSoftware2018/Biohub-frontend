<template>
  <div class="tab-pane active in fade" style="">
    <brick-list :api="api"></brick-list>
  </div>
</template>

<script>
  import BrickList from '@/components/forum/Brick/BrickList'

  export default {
    props: ['user'],
    components: { BrickList },
    computed: {
      api () {
        return `/api/users/n:${this.user.username}/bricks_starred/`
      }
    }
  }
</script>
