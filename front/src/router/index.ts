import {createRouter, createWebHistory} from 'vue-router'
import TatoueursView from '@/views/TatoueursView.vue'
import LoginView from "@/views/LoginView.vue";
import EventDetailsView from '@/views/EventDetailsView.vue';
import AccueilView from "@/views/AccueilView.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FlashView from "@/views/FlashView.vue";
import ConnexionView from "@/views/ConnexionView.vue";
import GestionProfilView from "@/views/admin/GestionProfilView.vue";
import GestionFlashView from "@/views/admin/GestionFlashView.vue";
import GestionDispoView from "@/views/admin/GestionReservationView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import ReservationView from "@/views/ReservationView.vue";
import FlashDetailView from "@/views/FlashDetailView.vue";
import TatoueurDetailsView from '@/views/TatoueurDetailsView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            children: [
                {
                    path: '',
                    component: AccueilView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                    path: '/flashs',
                    component: FlashView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                    path: '/flashs/1',
                    component: FlashDetailView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                    path: '/tatoueurs',
                    name: 'tatoueurs',
                    component: TatoueursView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                  path: '/tatoueurs/1',
                  component: TatoueurDetailsView,
                  meta: {
                    layout: BaseLayout
                  }
                },
                {
                    path: '/reservations',
                    component: ReservationView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                    path: '/login',
                    component: LoginView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                    path: '/event/1',
                    component: EventDetailsView
                }
            ]
        },
        {
            path: '/admin',
            children: [
                {
                    path: 'profil',
                    component: GestionProfilView,
                    meta: {
                        layout: AdminLayout
                    }
                },
                {
                    path: '/flashs',
                    component: GestionFlashView,
                    meta: {
                        layout: AdminLayout
                    }
                },
                {
                    path: '/reservations',
                    component: GestionDispoView,
                    meta: {
                        layout: AdminLayout
                    }
                },
                {
                    path: '/login',
                    component: ConnexionView,
                    meta: {
                        layout: LoginView
                    }
                },
            ]
        }
    ]
})

export default router
