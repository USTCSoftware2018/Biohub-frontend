<template>
  <div>
    <div class="postContainer" v-for="item in displayPost">
      <div>{{item.content}}@{{item.author.username}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        loadedData: null,
        displayPost: [],
        startPoint: 0
      }
    },
    methods: {
      initDisplay () {
        for (var i = this.startPoint; (i > (this.startPoint - 5)) && (i >= 0); i--) {
          console.log(this.loadedData.results[i])
          this.displayPost.push(this.loadedData.results[i])
        }
        this.startPoint -= 5
        console.log(this.displayPost)
      }
    },
    created () {
      axios.get(`/api/forum/experiences/${this.id}/posts/`).then((response) => {
        console.log(response)
        this.loadedData = response.data
        this.startPoint = response.data.results.length - 1
        console.log(this.startPoint, this.loadedData)
        this.initDisplay()
      })
    }
  }
</script>