<template>
  <ul class="p-nav p-nav-tabs">
    <li v-for="nav in navData" :class="nav.classes">
      <router-link :to="nav.to">
        {{ nav.text }}
        <span v-if="nav.label !== undefined" class="badge">
          {{ nav.label }}
        </span>
      </router-link>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['user'],
    methods: {
      makeRoute (route) {
        return {
          name: 'profile',
          params: {
            user: this.user.username
          },
          query: {
            tab: route
          }
        }
      }
    },
    computed: {
      navData () {
        const tab = this.$route.query.tab
        const source = ['Activities', 'Experiences', 'Followers', 'Following']
        let index = _.indexOf(source, tab)
        if (index < 0) index = 0
        const active = source[index]
        const labels = {
          Following: this.user.following_count,
          Followers: this.user.follower_count
        }

        let results = source.map(item => {
          return {
            text: item,
            to: this.makeRoute(item),
            classes: {
              active: active === item
            },
            label: labels[item]
          }
        })
        if (this.user.username === this.$root.user.username) {
          results = results.concat([{
            text: 'Settings',
            to: {
              name: 'settings'
            }
          }])
        }
        return results
      }
    }
  }
</script>
