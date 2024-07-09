import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TatoueursView from '@/views/TatoueursView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tatoueurs',
      name: 'tatoueurs',
      component: TatoueursView
    }
  ]
})

export default router
