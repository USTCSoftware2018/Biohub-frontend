export default {
  props: ['notice'],
  data () {
    return {
      linkInfos: {}
    }
  },
  methods: {
    getFragments (createElement) {
      const splitter = /(\[\[.*?\]\]\(\(.*?\)\)\(\(.*?\)\))/g
      const parser = /\[\[(.*?)\]\]\(\((.*?)\)\)\(\((.*?)\)\)/g
      const message = this.notice.message

      message.replace(parser, (_, title, type, pk) => {
        this.linkInfos[type] = { title, pk }
      })

      return message.split(splitter)
        .map(fragment => {
          let parsed = parser.exec(fragment)
          if (!parsed) return fragment

          // eslint-disable-next-line no-unused-vars
          let [_, title, type, pk] = parsed
          return this.makeLink(title, type, pk, createElement)
        }).concat([
          createElement(
            'small',
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
                  id: pk,
                  repo: this.linkInfos.brick.pk
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
              .then(() => {
                notice.has_read = true
                this.$emit('marked', this)
              })
          }
        }
      },
      this.getFragments(createElement)
    )
  }
}
