import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TatoueursView from '@/views/TatoueursView.vue'
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tatoueurs',
      name: 'tatoueurs',
      component: TatoueursView
    },
    {
      path: '/login', 
      component: LoginView
    },
  ]
})

export default router
