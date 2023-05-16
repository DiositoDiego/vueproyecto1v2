import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/computers',
    name: 'computers',
    component: () => import('../modules/computer/adapters/view/ComputersList.vue')
  },
  {
    path: '/computers/:id',
    name: 'computer',
    component: () => import('../modules/computer/adapters/view/ComputerEdit.vue')
  },
  {
    path: '/computers/create',
    name: 'ComputerCreate',
    component: () => import('../modules/computer/adapters/view/ComputerCreate.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
