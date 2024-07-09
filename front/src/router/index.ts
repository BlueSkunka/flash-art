import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TatoueursView from '@/views/TatoueursView.vue'
import LoginView from "@/views/LoginView.vue";
import EventDetailsView from '@/views/EventDetailsView.vue';
import TatoueurDetailsView from '@/views/TatoueurDetailsView.vue';

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
    {
      path: '/event/1',
      component: EventDetailsView
    },
    {
      path: '/tatoueurs/1',
      component: TatoueurDetailsView
    }
  ]
})

export default router
