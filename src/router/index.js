import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import communityHome from '@/components/community/Home'
import Repo from '@/components/community/Repo'
import User from '@/components/community/User'
import Profile from '@/components/community/Profile'
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
      path: '/community',
      name: 'Community',
      component: communityHome
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    // {
    //  path: '/community/:author/:name',
    //  name: 'Repo',
    //  component: Repo
    // },
    {
      path: '/community/:author',
      component: User,
      children: [
        {
          path: '',
          name: 'Profile',
          component: Profile
        },
        {
          path: ':repo',
          name: 'Repo',
          component: Repo
        }
      ]
    }
  ]
})
