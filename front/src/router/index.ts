import {createRouter, createWebHistory} from 'vue-router'
import TatoueursView from '@/views/TatoueursView.vue'
import LoginView from "@/views/LoginView.vue";
import EventDetailsView from '@/views/EventDetailsView.vue';
import AccueilView from "@/views/AccueilView.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FlashView from "@/views/FlashView.vue";
import GestionProfilView from "@/views/admin/GestionProfilView.vue";
import GestionFlashView from "@/views/admin/GestionFlashView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import ReservationView from "@/views/ReservationView.vue";
import FlashDetailView from "@/views/FlashDetailView.vue";
import TatoueurDetailsView from '@/views/TatoueurDetailsView.vue';
import TattooerRegisterView from "@/views/TattooerRegisterView.vue";
import UserRegisterView from "@/views/UserRegisterView.vue";
import GestionReservationView from '@/views/admin/GestionReservationView.vue';
import AccueilAdminView from "@/views/admin/AccueilAdminView.vue";
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";
import UserLoginView from "@/views/UserLoginView.vue";
import TattooerLoginView from "@/views/TattooerLoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            meta: {
                layout: BaseLayout
            },
            children: [
                {
                    path: '',
                    component: AccueilView,
                },
                {
                    path: '/flashs',
                    component: FlashView,
                    name: "flashes"
                },
                {
                    path: '/flashs/1',
                    component: FlashDetailView,
                },
                {
                    path: '/tatoueurs',
                    name: 'tattooers',
                    component: TatoueursView,
                },
                {
                  path: '/tatoueurs/1',
                  component: TatoueurDetailsView,
                },
                {
                    path: '/reservations',
                    component: ReservationView,
                },
                {
                    path: '/login/customer',
                    component: UserLoginView,
                    name: "login-customer"
                },
                {
                    path: '/login/tattooer',
                    component: TattooerLoginView,
                    name: "login-tattooer"
                },
                {
                    path: '/login',
                    component: LoginView,
                    name: "login"
                },
                {
                    path: '/register/user',
                    component: UserRegisterView,
                },
                {
                    path: '/register/tattooer',
                    component: TattooerRegisterView,
                },
                {
                    path: '/event/1',
                    component: EventDetailsView
                }
            ]
        },
        {
            path: '/admin',
            meta: {
                layout: AdminLayout
            },
            children: [
                {
                    path: '',
                    component: AccueilAdminView,
                    meta: {
                        layout: AdminLayout
                    }
                },
                {
                    path: 'profil',
                    component: GestionProfilView,

                },
                {
                    path: 'flashs',
                    component: GestionFlashView,
                    name: "admin-flashes"
                },
                {
                    path: 'reservations',
                    component: GestionReservationView,
                }
            ]
        }
    ]
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore()

    const isAuthenticated = computed(() => authStore.user !== null)

    if (!isAuthenticated.value && to.name !== 'login' && to.matched.find(match => match.path === '/admin')) {
        return {name: "login"}
    }
})

export default router
