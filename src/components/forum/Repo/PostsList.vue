<template>
  <div class="postContainer" v-bind:class="{hide: !open}">
    <div class="postHeader">{{num}} Comment(s)</div>
    <div class="posts">
      <div class="post" v-for="item in displayPost"><a class='commentUserInfo' :href="'/user/' + item.author.username">
        <img v-bind:src="item.author.avatar_url" style="width: 30px;margin-right: 10px;">{{item.author.username}}: </a>{{item.content}}<span class='pull-right timeago' :datetime='item.pub_time'></span></div>
    </div>
    <nav class='postPage' aria-label="navigation">
      <ul class="pagination" :id='"postPage" + this.expId'>
        <li v-for="i in paginationSequence"><a @click="setPage(i)">{{i}}</a></li>
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
        segment: 0,
        maxPage: 1,
        num: 0,
        paginationSequence: [],
        open: false,
        offsetOld: 0,
        offsetNew: 0
      }
    },
    methods: {
      setPage (page) {
        if (page === this.page) return
        this.displayPost = []
        var needToRemove = 0
        var needToAdd = 0
        var needToLoad = 0
        var i = 1
        var restPage = 0
        switch (page) {
          case '>':
            this.segment++
            this.paginationSequence = []
            this.paginationSequence.push('<')
            restPage = this.maxPage - this.segment * 5
            if (restPage <= 5) {
              while (i <= restPage) {
                this.paginationSequence.push(i + this.segment * 5)
                i++
              }
            } else {
              while (i <= 5) {
                this.paginationSequence.push(i + this.segment * 5)
                i++
              }
              this.paginationSequence.push('>')
            }
            if (this.segment > 0) needToAdd = 1
            if (this.segment === 1) needToRemove = this.page - 1
            else needToRemove = this.page
            this.page = 1
            needToLoad = this.segment * 5 + 1
            break
          case '<':
            this.segment--
            this.paginationSequence = []
            if (this.segment > 0) {
              this.paginationSequence.push('<')
            }
            restPage = this.maxPage - this.segment * 5
            while (i <= 5) {
              this.paginationSequence.push(i + this.segment * 5)
              i++
            }
            this.paginationSequence.push('>')
            if (this.segment > 0) needToAdd = 1
            needToRemove = this.page
            this.page = 1
            needToLoad = this.segment * 5 + 1
            break
          default:
            needToLoad = page
        }
        this.$nextTick(() => {
          $('#postPage' + this.expId + ' li')[needToRemove].firstChild.classList.remove('disabled')
          $('#postPage' + this.expId + ' li')[needToAdd].firstChild.classList.add('disabled')
        })
        axios.get(`/api/forum/experiences/${this.expId}/posts/?page=${needToLoad}`).then((response) => {
          i = 0
          this.displayPost = []
          while (i < response.data.results.length) {
            this.displayPost.splice(0, 0, response.data.results[i])
            i++
          }
        })
      },
      submitPost () {
        this.postContainer = document.querySelector('#postContent' + this.expId)
        this.postContent = this.postContainer.innerText
        axios.post('/api/forum/posts/', {
          experience_id: this.expId,
          content: this.postContent
        }).then((response) => {
          console.log(response)
          this.postContainer.innerText = ''
          this.postContent = ''
          this.displayPost.splice(0, 0, response.data)
          if (this.num === 0) {
            $('#postPage' + this.expId).empty()
          }
          this.num++
        })
      },
      postFocus () {
        $('#postOutsideContainer' + this.expId)[0].classList.add('textareaFocus')
      },
      postBlur () {
        $('#postOutsideContainer' + this.expId)[0].classList.remove('textareaFocus')
      },
      load () {
        this.open = true
        var i = 1
        axios.get(`/api/forum/experiences/${this.expId}/posts/`).then((response) => {
          this.loadedData = response.data
          this.num = response.data.count
          this.maxPage = Math.floor(response.data.count / 10) + 1
          $('#postPage' + this.expId).html('')
          if (this.maxPage > 5) {
            while (i <= 5) {
              this.paginationSequence.push(i)
              i++
            }
            this.paginationSequence.push('>')
          } else {
            if (this.num === 0) {
              $('#postPage' + this.expId).append('<p style="color:#999;">Oops, nothing\'s here</p>')
              i++
            }
            while (i <= this.maxPage) {
              this.paginationSequence.push(i)
              i++
            }
          }
          this.$nextTick(() => {
            $('#postPage' + this.expId + ' li')[0].firstChild.classList.add('disabled')
            timeago().render($('.timeago'))
          })
          this.displayPost = []
          for (var j = 0; j < response.data.results.length; j++) {
            this.displayPost.splice(0, 0, response.data.results[j])
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      switch () {
        if (!this.open) {
          this.open = true
          this.load()
        } else {
          this.open = false
        }
      }
    }
  }
</script>

<style>

</style>
