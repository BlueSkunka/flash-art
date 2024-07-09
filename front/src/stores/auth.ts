import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {

    const url = import.meta.env.VITE_BACKEND_URL + "/users/login"
    const user = ref({})

    async function login(email: string, password: string) {
        return await axios.post(
            url,
            {
                email: email,
                password: password
            }
        ).then(function (response) {
            localStorage.setItem('user', token);

            return true
        })
            .catch(function (error) {
                return false
            })
    }

    return {user, login}
})
