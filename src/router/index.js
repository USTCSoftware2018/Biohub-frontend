import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import NotFound from '@/components/NotFound'
import forumHome from '@/components/forum/Home'
import Repo from '@/components/forum/Repo/Repo'
import User from '@/components/forum/User'
import Profile from '@/components/forum/Profile/Profile'
import Plugins from '@/components/plugins/plugins'
import SearchResult from '@/components/forum/Search/SearchResult'
import Settings from '@/components/Settings'
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forums',
      name: 'Forum',
      component: forumHome
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/forums/:author',
      component: User,
      children: [
        {
          path: '',
          name: 'Profile',
          component: Profile
        },
        {
          path: ':repo',
          component: Repo,
          name: 'Repo',
          children: [{
            path: 'experience',
            component: Repo,
            name: 'RepoExperienceList'
          },
          {
            path: 'experience/:id',
            component: Repo,
            name: 'RepoExperience'
          }]
        }
      ]
    },
    {
      path: '/search',
      name: 'searchResult',
      component: SearchResult
    },
    {
      path: '/plugins',
      component: Plugins,
      name: 'Plugins'
    },
    {
      path: '/plugins/:plugin',
      component: Plugins,
      name: 'Plugin'
    },
    {
      path: '/settings',
      component: Settings,
      name: 'setting'
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
