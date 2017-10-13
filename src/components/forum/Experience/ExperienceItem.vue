<template>
  <div class="experience-item">
    <h3 class="experience-title">
      <router-link :to="expLink" style="font-weight: 200;font-size: 24px;">{{ experience.title }}</router-link>
    </h3>
    <div class="experience-author" style="margin-top: 15px;">
      <template v-if="!experience.author">
        {{ experience.author_name }}
      </template>
      <template v-else>
        <router-link :to="{ name: 'profile', params: { user: experience.author.username }}">
          <img :src="experience.author.avatar_url" alt="">
          {{ experience.author.username }}
        </router-link>
      </template>
    </div>
    <div class="experience-content">
      <transition name="fade">
      <p class="digest" v-if="!fullText" @click="loadFullText">
        {{ experience.content.digest }}
        <a href="javascript:;">Expand <i class="fa fa-angle-double-down"></i></a>
      </p>
      <div v-else v-html="contentHTML" class="content"></div>
      </transition>
    </div>
    <div class="experience-footer clearfix">
      <button :class="voteButtonClasses" @click="toggleVote" :diabled="!cannotVote">
        <i class="fa fa-thumbs-up"></i>
        {{ experience.votes }}
      </button>
      <router-link :to="expLink" class="text-muted">
        <i class="fa fa-comment-o"></i> {{ commentsText }}
      </router-link>
      <small class="timeago text-muted" :datetime="experience.pub_time" ref="pub_time"></small>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import marked from 'marked'

  export default {
    props: ['experience'],
    data () {
      return {
        fullText: null
      }
    },
    mounted () {
      timeago().render(this.$refs.pub_time)
    },
    methods: {
      toggleVote () {
        const voted = this.experience.voted
        const action = voted ? 'unvote' : 'vote'
        const delta = voted ? -1 : 1

        axios.post(`/api/forum/experiences/${this.experience.id}/${action}/`)
          .then(() => {
            this.experience.voted = !voted
            this.experience.votes += delta
          })
      },
      loadFullText () {
        axios.get(`/api/forum/experiences/${this.experience.id}/text/`)
          .then(({ data }) => {
            this.fullText = data
          })
      }
    },
    computed: {
      expLink () {
        return {
          name: 'Exp',
          params: {
            repo: this.experience.brick,
            id: this.experience.id
          }
        }
      },
      contentHTML () {
        return marked(this.fullText)
      },
      cannotVote () {
        return this.$root.user && this.experience.user &&
          this.$root.user.username === this.experience.user.username
      },
      voteButtonClasses () {
        let result = ['btn', 'btn-forum', 'btn-vote']
        if (this.experience.voted) result.push('voted')

        return result
      },
      commentsText () {
        const comments = this.experience.posts_num
        if (!comments) return 'Comment'

        const text = comments === 1 ? 'Comment' : 'Comments'
        return `${comments} ${text}`
      }
    }
  }
</script>
