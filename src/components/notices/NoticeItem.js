export default {
  props: ['notice'],
  methods: {
    getFragments (createElement) {
      const splitter = /(\[\[.*?\]\]\(\(.*?\)\)\(\(.*?\)\))/g
      const parser = /\[\[(.*?)\]\]\(\((.*?)\)\)\(\((.*?)\)\)/
      return this.notice.message.split(splitter)
        .map(fragment => {
          let parsed = parser.exec(fragment)
          if (!parsed) return fragment
          let [_, title, type, pk] = parsed
          return this.makeLink(title, type, pk, createElement)
        }).concat([
          createElement(
            'span',
            {
              class: ['timeago', 'pull-right', 'text-muted'],
              attrs: {
                datetime: this.notice.created
              },
              ref: 'created'
            }
          )
        ])
    },
    makeLink (title, type, pk, createElement) {
      return createElement(
        'router-link',
        {
          attrs: {
            to: {
              experience: {
                name: 'Exp',
                params: {
                  id: pk
                }
              },
              user: {
                name: 'Profile',
                params: {
                  author: pk
                }
              },
              brick: {
                name: 'Brick',
                params: {
                  repo: pk
                }
              }
            }[type]
          }
        },
        [title]
      )
    }
  },
  mounted () {
    console.log(timeago)
    timeago().render(this.$refs.created)
  },
  render (createElement) {
    return createElement(
      'div',
      {
        class: {
          'notice-item': true,
          'clearfix': true,
          'notice-unread': !this.notice.has_read
        },
        on: {
          click: e => {
            let notice = this.notice
            if (notice.has_read) return
            axios.get(`/api/notices/${notice.id}/mark_read/`)
              .then(() => { notice.has_read = true })
          }
        }
      },
      this.getFragments(createElement)
    )
  }
}
