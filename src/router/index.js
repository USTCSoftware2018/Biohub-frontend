import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/account/Login'
import Home from '@/components/Home'
import Signup from '@/components/account/Signup'
import NotFound from '@/components/NotFound'
import Forum from '@/components/forum/Forum'
import ForumHome from '@/components/forum/Home'
import Repo from '@/components/forum/Repo/Repo'
import ExperienceListView from '@/components/forum/Repo/ExperienceListView'
import ExperienceDetailView from '@/components/forum/Repo/ExperienceDetailView'
import Write from '@/components/forum/Repo/Write'
import Profile from '@/components/forum/Profile/Profile'
import Plugins from '@/components/plugins/Plugins'
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
          component: ForumHome,
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
          path: 'brick/:brick',
          component: Repo,
          children: [
            {
              path: '',
              name: 'Brick',
              component: ExperienceListView
            },
            {
              path: 'experience/:id',
              name: 'Exp',
              component: ExperienceDetailView
            },
            {
              path: 'write',
              name: 'Write-Exp',
              component: Write
            }
          ]
        },
        {
          path: 'settings',
          component: Settings,
          name: 'settings'
        },
        {
          path: 'plugins',
          component: Plugins,
          name: 'plugins'
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
