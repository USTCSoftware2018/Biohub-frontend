import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
<<<<<<< HEAD
import communityHome from '@/components/community/Home'
=======
import Signup from '@/components/Signup'
>>>>>>> 20aa0fabb8fe3ac034d5f300581d81c3424e5063

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
<<<<<<< HEAD
      path: '/community',
      name: 'Community',
      component: communityHome
=======
      path: '/signup',
      name: 'Signup',
      component: Signup
>>>>>>> 20aa0fabb8fe3ac034d5f300581d81c3424e5063
    }
  ]
})
