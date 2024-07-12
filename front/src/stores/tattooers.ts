import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import type {Tattooer} from "@/entities/tattooer";
import {useFlashesStore} from "@/stores/flashes";
import {useOpinionStore} from "@/stores/opinions";

export const useTattooersStore = defineStore('tattooers', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/tattooers")
    const tattooers = ref<Tattooer[]>([])
    const tattooer = ref<Tattooer|null>(null)
    const isLoading = ref(false)
    const flashStore = useFlashesStore()
    const opinionStore = useOpinionStore()

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

        url.searchParams.delete("style")


        isLoading.value = false
    }

    async function findOne(_id: string) {
        isLoading.value = true

        tattooer.value = await axios.get(url + '/' + _id)
            .then(response => {
                return response.data
            })
            .catch(err => console.error(err))

        await flashStore.findByTattooer(tattooer.value, false)
        await opinionStore.findByTattooer(tattooer.value)

        isLoading.value = false
    }

    return {tattooers, tattooer, findAll, findOne, isLoading}
})
