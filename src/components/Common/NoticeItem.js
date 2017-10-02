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
        })
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
  render (createElement) {
    return createElement(
      'div',
      {
        class: {
          'notice-item': true,
          'notice-unread': !this.notice.has_read
        }
      },
      this.getFragments(createElement)
    )
  }
}
