<template>
  <div class="col-md-9">
    <div class="card" style="margin: 20px 0 10px 0;text-align: center;cursor: pointer;" @click="$router.push({name:'Brick',repo:$route.params.repo})">
      View All Experience
    </div>
    <transition name="fade">
      <div class="card experience-detail" v-if="experience">
        <div class="experience-title">
          <h2>{{ experience.title }}</h2>
        </div>
        <div class="experience-author">
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
          <div v-html="content" class="content"></div>
        </div>
      </div>
      <template v-else>
        <p key="warning" class="loading">Loading <i class="fa fa-pulse fa-spinner fa-fw"></i></p>
      </template>
    </transition>
    <transition name="fade">
      <div class="card posts" v-if="experience">
        <post-editor :expId="expId" @created="postCreated"></post-editor>
        <post-list :expId="expId" ref="posts"></post-list>
      </div>
      <template v-else>
        <p key="warning" class="loading">Loading <i class="fa fa-pulse fa-spinner fa-fw"></i></p>
      </template>
    </transition>

  </div>
</template>

<script>
  import marked from 'marked'
  import PostEditor from '../Post/PostEditor'
  import PostList from '../Post/PostList'

  export default {
    components: { PostEditor, PostList },
    data () {
      return {
        experience: null,
        expId: null
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (to.params.id !== vm.expId) {
          vm.reload()
        }
      })
    },
    beforeRouteUpdate (to, from, next) {
      if (to.params.id !== this.expId) {
        this.reload()
      }
      next()
    },
    computed: {
      content () {
        return marked(this.experience.content.text)
      }
    },
    methods: {
      postCreated (item) {
        this.$refs.posts.prepend(item)
      },
      reload () {
        const id = this.$route.params.id
        const repo = this.$route.params.repo

        axios.get(`/api/forum/bricks/${repo}/experiences/${id}/`)
          .then(response => {
            this.expId = id
            if (this.$refs.posts) this.$refs.posts.loadPosts()
            this.$set(this, 'experience', response.data)
          }, ({response: { status }}) => {
            if (status === 404) this.$router.push({ name: 'NotFound' })
          })
      }
    }
  }
</script>
