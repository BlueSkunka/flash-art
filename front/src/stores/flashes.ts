import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import type {Flash} from "@/entities/flash";

export const useFlashesStore = defineStore('flashes', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/flashes")
    const flashes = ref<Flash[]>([])
    const isLoading = ref(false)

    async function findAll() {
        isLoading.value = true

        flashes.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        isLoading.value = false
    }

    async function findByTattooer(tattooer: User) {
        isLoading.value = true

        url.searchParams.set("tattooer", tattooer._id.toString())

        flashes.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        isLoading.value = false
    }

    return {flashes, isLoading, findAll, findByTattooer}
})
