import {createRouter, createWebHistory} from 'vue-router'
import TatoueursView from '@/views/TatoueursView.vue'
import LoginView from "@/views/LoginView.vue";
import TattooerRegisterView from "@/views/TattooerRegisterView.vue";
import UserRegisterView from "@/views/UserRegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tatoueurs',
      name: 'tatoueurs',
      component: TatoueursView
    },
      {
          path: '/register/tatoueur',
          name: 'register-tattooer',
          component: TattooerRegisterView
      },
      {
          path: '/register/client',
          name: 'register-user',
          component: UserRegisterView
      },
    {
      path: '/login',
        component: LoginView,
        name: "login"
    },
  ]
})

export default router
