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
      <div class="textarea" :id="'postOutsideContainer'+ expId">
        <div contenteditable="true" v-model="postContent"
             v-on:focus="postFocus"
             v-on:blur="postBlur"
             :id="'postContent'+ expId" class="innerText">
        </div>
      </div>
      <button class="btn btn-forum" @click.prevent="submitPost()">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['expId'],
    data () {
      return {
        postContent: '',
        loadedData: null,
        displayPost: [],
        startPoint: 0,
        page: 1,
        maxPage: 1
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
      },
      submitPost () {
        this.postContent = document.querySelector('#postContent' + this.expId).innerText
        console.log(this.postContent)
        axios.post('/api/forum/posts/', {
          experience_id: this.expId,
          content: this.postContent
        }).then((response) => {
          console.log(response)
          document.querySelector('#postContent' + this.expId).innerText = ''
          this.postContent = ''
          this.displayPost.splice(0, 0, response.data)
          this.$store.commit('newCommentReceived', this.expId)
        })
      },
      postFocus () {
        $('#postOutsideContainer' + this.expId)[0].classList.add('textareaFocus')
      },
      postBlur () {
        $('#postOutsideContainer' + this.expId)[0].classList.remove('textareaFocus')
      }
    },
    created () {
      axios.get(`/api/forum/experiences/${this.expId}/posts/`).then((response) => {
        this.loadedData = response.data
        this.startPoint = response.data.results.length - 1
        this.load()
      })
    }
  }
</script>

<style>

</style>
