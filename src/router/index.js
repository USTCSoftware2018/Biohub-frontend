import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/account/Login'
import Home from '@/components/Home'
import Signup from '@/components/account/Signup'
import NotFound from '@/components/NotFound'
import Forum from '@/components/forum/Forum'
import forumHome from '@/components/forum/Home'
import Repo from '@/components/forum/Repo/Repo'
import Profile from '@/components/forum/Profile/Profile'
import Plugins from '@/components/plugins/plugins'
import Search from '@/components/forum/Search/Search'
import Settings from '@/components/account/Settings'
import Reset from '@/components/account/Reset'
import NoticesView from '@/components/notices/NoticesView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dev',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/reset',
      name: 'Reset',
      component: Reset
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/forum',
      component: Forum,
      children: [
        {
          path: '',
          component: forumHome,
          name: 'forum-home'
        },
        {
          path: 'notices',
          component: NoticesView,
          name: 'notices'
        },
        {
          path: 'user/:user',
          name: 'profile',
          component: Profile
        },
        {
          path: 'search',
          component: Search,
          name: 'search'
        },
        {
          path: 'brick/:repo',
          component: Repo,
          name: 'Brick',
          children: [
            {
              path: 'experience/:id',
              name: 'Exp',
              component: Repo
            }
          ]
        },
        {
          path: 'settings',
          component: Settings,
          name: 'settings'
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/plugins',
      component: Plugins,
      name: 'plugins'
    },
    {
      path: '/plugins/:plugin',
      component: Plugins,
      name: 'Plugin'
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
