<template>
  <button :class="voteButtonClasses" @click="toggleVote" :disabled="cannotVote">
    <i class="fa fa-thumbs-up"></i>
    {{ experience.votes }}
  </button>
</template>

<script>
  export default {
    props: ['experience'],
    methods: {
      toggleVote () {
        const voted = this.experience.voted
        const action = voted ? 'unvote' : 'vote'
        const delta = voted ? -1 : 1

        if (this.cannotVote) {
          alert('You cannot vote your own experience.')
          return
        }

        axios.post(`/api/forum/experiences/${this.experience.id}/${action}/`)
          .then(() => {
            this.experience.voted = !voted
            this.experience.votes += delta
          })
          .catch(e => {
            if (e.response.status === 429) {
              alert('You vote too fast!\nTwo votes should have an interval of at least 15 seconds.')
            }
          })
      }
    },
    computed: {
      cannotVote () {
        return this.$root.user && this.experience.author &&
          this.$root.user.username === this.experience.author.username
      },
      voteButtonClasses () {
        let result = ['btn', 'btn-forum', 'btn-vote']
        if (this.experience.voted) result.push('voted')

        return result
      }
    }
  }
</script>
