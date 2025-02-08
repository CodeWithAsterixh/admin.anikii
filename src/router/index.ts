import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const files = () => import('@/views/FilesView.vue')
const filesView = () => import('@/views/FileFolderView.vue')
const contentView = () => import('@/views/ContentItemView.vue')

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
    {
      path: '/files/:name',
      name: 'file',
      component: filesView,
    },
    {
      path: '/files/:name/:page',
      name: 'file content',
      component: contentView,
    },
  ],
})

export default router
