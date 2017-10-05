export default {
  components: {
    FollowButton: {
      props: ['user'],
      data () {
        return {
          toggling: false
        }
      },
      methods: {
        toggleRelation () {
          if (this.toggling) return

          let action = this.user.followed ? 'unfollow' : 'follow'
          let url = `/api/users/n:${this.user.username}/${action}/`
          this.toggling = true
          axios.post(url)
            .then(response => {
              this.user.followed = !this.user.followed
            }).always(() => {
              this.toggling = false
            })
        }
      },
      render (h) {
        return h(
          'div',
          {},
          [
            h(
              'button',
              {
                class: ['btn btn-follow'],
                attrs: {
                  disabled: this.toggling
                },
                on: {
                  click: this.toggleRelation
                }
              },
              [
                this.user.followed ? 'Unfollow' : 'Follow'
              ]
            )
          ]
        )
      }
    }
  }
}
