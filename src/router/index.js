import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//导入登录
const login = () => import('../views/login')
const findpass = () => import('../views/findpass')
const register = () => import('../views/register')
const changepwd = () => import('../views/changepwd')
const identity = () => import('../views/identityverify')
const studentstatus = () => import('../views/studentstatusverify')
const backstage = () => import('../views/backstage')
const aboutsu = () => import('../views/aboutus')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/backstage',
    name: 'backstage',
    component: backstage
  },
  {
    path: '/about',
    name: 'about',
    component: aboutsu
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
