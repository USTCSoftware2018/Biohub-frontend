<template>
  <div class="postContainer">
    <div class="postHeader">{{loadedData.results.length}} Comment(s)</div>
    <div class="posts">
      <div class="post" v-for="item in displayPost"><a class='commentUserInfo' :href="'/user/' + item.author.username"><img v-bind:src="item.author.avatar_url">{{item.author.username}} </a>{{item.content}}</div>
    </div>
    <nav class='postPage' aria-label="navigation">
      <ul class="pagination">
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
      </ul>
    </nav>
    <form class="postForm">
      <div v-model="postContent" class="textarea" contenteditable="true" id="postContent"></div>
      <button class="btn btn-forum" @click.prevent="submitPost">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['brickId'],
    data () {
      return {
        loadedData: null,
        displayPost: [],
        startPoint: 0,
        page: 1
      }
    },
    methods: {
      load () {
        this.displayPost = []
        for (var i = this.startPoint; (i > (this.startPoint - 10)) && (i >= 0); i--) {
          this.displayPost.push(this.loadedData.results[i])
        }
        this.startPoint -= 10
      },
      setPage (page) {

      }
    },
    created () {
      axios.get(`/api/forum/experiences/${this.brickId}/posts/`).then((response) => {
        this.loadedData = response.data
        this.startPoint = response.data.results.length - 1
        this.load()
      })
    }
  }
</script>

<style>

</style>
