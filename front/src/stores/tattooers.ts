import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import type {Tattooer} from "@/entities/tattooer";

export const useTattooersStore = defineStore('tattooers', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/tattooers")
    const tattooers = ref<Tattooer[]>([])
    const isLoading = ref(false)

    async function findAll(style: string | null = null) {
        isLoading.value = true

        if (style) {
            url.searchParams.set("style", style)
        }

        tattooers.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        isLoading.value = false
    }

    return {tattooers, findAll, isLoading}
})
