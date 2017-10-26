<template>
  <div class="col-md-9">
    <div class="card" style="margin: 20px 0 10px 0;text-align: center;cursor: pointer;" @click="$router.push({name:'Brick',params: {brick:$route.params.brick}})">
      View All Experiences
    </div>
    <transition name="fade">
      <div class="card experience-detail" v-if="experience">
        <div class="experience-title">
          <h2 style="text-align: center">{{ experience.title }}</h2>
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
        <div class="card experience-attachments" v-if="experience.content.files.length">
          <a v-for="item in experience.content.files" :href="item.file" target="_blank">
            {{item.name}}
          </a>
        </div>
        <div class="experience-footer clearfix">
          <vote-button :experience="experience"></vote-button>
          <router-link
            v-if='isMine'
            class="text-muted"
            :to="{ name: 'Write-Exp', params: {brick: experience.brick}, query: {expId: experience.id}}">
            Edit
          </router-link>
          &nbsp;
          <a href="javascript:;" class="text-muted" v-if="isMine" @click="deleteExp">Delete</a>
          <small class="timeago text-muted" :datetime="experience.pub_time" ref="pub_time"></small>
        </div>
        <div class="experience-footer">

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
  import VoteButton from '../Experience/VoteButton'

  export default {
    components: { PostEditor, PostList, VoteButton },
    data () {
      return {
        experience: null,
        expId: null
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (to.params.id !== vm.expId) {
          vm.reload(to.params.id)
        }
      })
    },
    beforeRouteUpdate (to, from, next) {
      if (to.params.id !== this.expId) {
        this.reload(to.params.id)
      }
      next()
    },
    computed: {
      content () {
        return marked(this.experience.content.text)
      },
      isMine () {
        return this.$root.user && this.experience.author &&
          this.$root.user.username === this.experience.author.username
      }
    },
    methods: {
      deleteExp () {
        if (confirm('Are you sure to delete? This action is not revokable.')) {
          const brick = this.$route.params.brick
          const id = this.experience.id

          axios.delete(`/api/forum/bricks/${brick}/experiences/${id}/`)
            .then(() => {
              alert('Successful deleted!')
              this.$router.replace({
                name: 'Brick',
                params: {
                  brick: this.$route.params.brick
                }
              })
            })
        }
      },
      postCreated (item) {
        this.$refs.posts.prepend(item)
      },
      reload (id) {
        const brick = this.$route.params.brick

        axios.get(`/api/forum/bricks/${brick}/experiences/${id}/`)
          .then(response => {
            this.expId = id
            if (this.$refs.posts) this.$refs.posts.loadPosts()
            this.$set(this, 'experience', response.data)
            this.$nextTick(() => {
              timeago().render(this.$refs.pub_time)
            })
          }, ({response: { status }}) => {
            if (status === 404) this.to404()
          })
      }
    }
  }
</script>
