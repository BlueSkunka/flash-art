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
                    },
                    name: "flashes"
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
                    name: 'tattooers',
                    component: TatoueursView,
                    meta: {
                        layout: BaseLayout
                    },
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
                    path: '/login/customer',
                    component: UserLoginView,
                    meta: {
                        layout: BaseLayout
                    },
                    name: "login-customer"
                },
                {
                    path: '/login/tattooer',
                    component: TattooerLoginView,
                    meta: {
                        layout: BaseLayout
                    },
                    name: "login-tattooer"
                },
                {
                    path: '/login',
                    component: LoginView,
                    meta: {
                        layout: BaseLayout
                    },
                    name: "login"
                },
                {
                    path: '/register/user',
                    component: UserRegisterView,
                    meta: {
                        layout: BaseLayout
                    }
                },
                {
                    path: '/register/tattooer',
                    component: TattooerRegisterView,
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
                    path: '',
                    component: AccueilAdminView,
                    meta: {
                        layout: AdminLayout
                    }
                },
                {
                    path: 'profil',
                    component: GestionProfilView,
                    meta: {
                        layout: AdminLayout
                    }
                },
                {
                    path: 'flashs',
                    component: GestionFlashView,
                    meta: {
                        layout: AdminLayout
                    },
                    name: "admin-flashes"
                },
                {
                    path: 'reservations',
                    component: GestionReservationView,
                    meta: {
                        layout: AdminLayout
                    }
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
