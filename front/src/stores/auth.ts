import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import Role from "@/enums/role";

export const useAuthStore = defineStore('auth', () => {

    const urlUser = import.meta.env.VITE_BACKEND_URL + "/users/login"
    const urlTattooer = import.meta.env.VITE_BACKEND_URL + "/tattooers/login"

    const user = ref<User | null>(null)

    async function login(email: string, password: string, role: string) {
        user.value = await axios.post(
            role === Role.TATTOOER ? urlTattooer : urlUser,
            {
                email: email,
                password: password
            }
        ).then(function (response) {
            localStorage.setItem('user', response.data.token);

            return response.data.user
        })
        .catch(function (error) {
            return false
        })

        return user.value !== false
    }

    function logout() {
        localStorage.removeItem('user');
        user.value = null
    }

    return {user, login, logout}
})
