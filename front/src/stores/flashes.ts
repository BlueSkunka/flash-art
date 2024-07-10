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

        url.searchParams.delete("tattooer")

        isLoading.value = false
    }

    async function create(data: object) {
        const isCreated = await axios.post(
            url,
            data
        ).then(response => {
            flashes.value.push(response.data)

            return response.status === 201
        }).catch(error => {
            return false
        })

        return isCreated
    }

    async function remove(flash: Flash) {
        isLoading.value = true

        const isDeleted = await axios.delete(url.href + '/' + flash._id)
            .then(response => {
                return response.status === 204
            })
            .then(error => {
                return false
            })

        if (isDeleted) {
            const index = flashes.value.findIndex(flashItem => flash === flashItem)
            flashes.value.splice(index, 1)
        }

        isLoading.value = false

        return isDeleted
    }

    return {flashes, isLoading, findAll, findByTattooer, remove, create}
})
