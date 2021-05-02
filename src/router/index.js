import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//导入登录
const login = () => import('../views/login')
const findpass = () => import('../views/findpass')
const register = () => import('../views/register')
const changepwd = () => import('../views/changepwd')
const identity = () => import('../views/identityverify')
const studentstatus = () => import('../views/studentstatusverify')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/findpass',
    name: 'findpass',
    component: findpass
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/changepwd',
    name: 'changepwd',
    component: changepwd
  },
  {
    path: '/iverify/:email',
    name: 'identity',
    component: identity
  },
  {
    path: '/sverify/:email',
    name: 'studentstatus',
    component: studentstatus
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
