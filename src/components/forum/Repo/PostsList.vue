<template>
  <div>
    <div class="postContainer">
      <div class="post" v-for="item in displayPost">{{item.content}}<span class="pull-right">@{{item.author.username}}</span></div>
    </div>
    <a @click="load" v-if="hasMore" class="biohub-a">Load More<i class="fa fa-angle-double-down"></i></a>
  </div>
</template>

<script>
  import Bus from '../../../utils/bus'
  export default {
    props: ['id'],
    data () {
      return {
        loadedData: null,
        displayPost: [],
        startPoint: 0,
        hasMore: false
      }
    },
    methods: {
      load () {
        for (var i = this.startPoint; (i > (this.startPoint - 5)) && (i >= 0); i--) {
          this.displayPost.push(this.loadedData.results[i])
        }
        this.startPoint -= 5
        if (this.startPoint > 0) {
          this.hasMore = true
        }
      }
    },
    created () {
      axios.get(`/api/forum/experiences/${this.id}/posts/`).then((response) => {
        this.loadedData = response.data
        this.startPoint = response.data.results.length - 1
        this.load()
      })
      Bus.$on('newPost', (newPost) => {
        this.displayPost.splice(0, 0, newPost)
      })
    }
  }
</script>

<style>

</style>
