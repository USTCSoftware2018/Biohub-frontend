<template>
  <div class="postContainer">
    <div class="postHeader">{{num}} Comment(s)</div>
    <div class="posts">
      <div class="post" v-for="item in displayPost"><a class='commentUserInfo' :href="'/user/' + item.author.username"><img v-bind:src="item.author.avatar_url">{{item.author.username}} </a>{{item.content}}</div>
    </div>
    <nav class='postPage' aria-label="navigation">
      <div :id='"postPage"+expId'></div>
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
  import Vue from 'vue'
  export default {
    props: ['expId'],
    data () {
      return {
        postContent: '',
        loadedData: null,
        displayPost: [],
        startPoint: 0,
        page: 1,
        maxPage: 1,
        num: 0
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
        if (page > this.page) {
          if (page - this.page > 5) {
          } else {
            $('#postPage' + this.expId + ' ul li')[(this.page + 4) % 5].classNode.remove('disabled')
            $('#postPage' + this.expId + ' ul li')[(page + 4) % 5].classNode.add('disabled')
          }
        }
        this.page = page
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
        this.num = response.data.count
        this.maxPage = Math.floor(response.data.count / 10) + 1
        if (this.maxPage > 5) {
        } else {
          if (this.num === 0) {
            $('#postPage' + this.expId + ' ul').append('<p style="color: #999;">Oops, nothing\'s here...</p>')
          } else {
            let i = 1
            var tempString = '<ul class="pagination">'
            while (i <= this.maxPage) {
              if (i === 1) tempString += '<li><a href="#" class="disabled" @click="setPage(' + i + ')">' + i + '</a></li>'
              else tempString += '<li><a href="#" @click="setPage(' + i + ')">' + i + '</a></li>'
              i++
            }
            tempString += '</ul>'
            var Pagination = Vue.extend({
              template: tempString
            })
            new Pagination().$mount('#postPage' + this.expId)
          }
        }
        this.load()
      })
    }
  }
</script>

<style>

</style>
