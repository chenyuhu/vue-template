import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../win/mainWin/views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../win/mainWin/views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
