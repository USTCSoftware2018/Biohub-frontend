<template>
  <div class="experience-wrapper">
    <div class="experience-header">
      <img :src="specificExp.author.avatar_url" style="width: 30px;"></span>
      <router-link :to="{name: 'profile',params:{user: specificExp.author_name}}" class="experience-author-name">{{specificExp.author_name}}</router-link>
    </div>
    <div class="list-group-item-text" v-html="specificExp.content.text"></div>
    <div class="action-bar">
      <button class="btn btn-forum" @click="upvote()" :id='"upvoteButton" + specificExp.id' v-bind:class=
      "{'hasVoted':specificExp.voted, 'cannotVote': (specificExp.author_name === $root.user.username)}">
      <span v-if="!specificExp.voted"><i class="fa fa-angle-up"></i></span>
      <span v-else><i class="fa fa-angle-down"></i></span> {{specificExp.up_vote_num}}</button>
      <a @click='showPosts' style="margin-left: 15px;"><i class="fa fa-comment-o"></i> {{specificExp.posts_num}} Comment(s)</a>
      <a style="margin-left: 15px;" data-toggle="collapse" href="#file" aria-expanded="false" aria-controls="file">
        <i class='fa fa-download'></i> Files
      </a>
      <div class="collapse" id="file">
        <ul class="list-group">
          <li v-for='item in specificExp.content.files' class='list-group-item'><a :href='item.file'>{{item.file}}</a></li>
        </ul>
      </div>
      <posts-list :expId="specificExp.id" ref="comments"></posts-list>
    </div>
  </div>
</template>

<script>
  import PostsList from './PostsList'
  export default {
    props: ['expID'],
    data () {
      return {
        specificExp: null
      }
    },
    created () {
      axios.get(`/api/forum/experiences/${this.expID}/`).then((response) => {
        this.specificExp = response.data
      }).catch((_) => {
      })
    },
    components: {
      PostsList
    },
    methods: {
      showPosts (id) {
        this.$refs['comments'].switch()
      },
      upvote () {
        if (!this.specificExp.voted) {
          axios.post(`/api/forum/experiences/${this.expID}/vote/`).then(() => {
            this.specificExp.voted = true
          })
        } else {
          axios.post(`/api/forum/experiences/${this.expID}/unvote/`).then(() => {
            this.specificExp.voted = false
          })
        }
      }
    }
  }
</script>
