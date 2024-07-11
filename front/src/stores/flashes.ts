import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import {Flash} from "@/entities/flash";

export const useFlashesStore = defineStore('flashes', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/flashes")
    const flashes = ref<Flash[]>([])
    const flash = ref<Flash>()
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

    async function findOne(id: number) {
        isLoading.value = true

        await axios.get(url.href + '/' + id)
            .then(response => {
                if (response.status === 200) {
                    flash.value = response.data

                    return true
                }

                return false
            })
            .catch(error => {
                console.log(error)

                return false
            })

        isLoading.value = false
    }

    async function create(data: object) {
        const isCreated = await axios.post(
            url,
            data
        ).then(response => {
            if (response.status === 201) {
                flashes.value.push(response.data)

                return true
            }

            return false
        }).catch(error => {
            console.error(error)

            return false
        })

        return isCreated
    }

    async function update(data: object, flashId: number) {
        const isUpdated = await axios.put(
            url.href  + '/' + flashId,
            data
        ).then(response => {
            if (response.status === 200) {
                const flashIndex = flashes.value.findIndex(flash => flash._id === flashId)
                flashes.value[flashIndex] = response.data

                return true
            }

            return false
        }).catch(error => {
            console.error(error)

            return false
        })

        return isUpdated
    }

    async function remove(flash: Flash) {
        isLoading.value = true

        const isDeleted = await axios.delete(url.href + '/' + flash._id)
            .then(response => {
                if (response.status === 204) {
                    const index = flashes.value.findIndex(flashItem => flash === flashItem)
                    flashes.value.splice(index, 1)

                    return true;
                } else {
                    return false;
                }
            })
            .catch(error => {
                console.error(error)

                return false
            })

        isLoading.value = false

        return isDeleted
    }

    return {flash, flashes, isLoading, findAll, findByTattooer, findOne, remove, create, update}
})
