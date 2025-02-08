import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const files = () => import('@/views/FilesView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/files',
      name: 'files',
      component: files,
    },
  ],
})

export default router
