import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import type {Flash} from "@/entities/flash";
import type { Tattooer } from '@/entities/tattooer';
import type { Address } from '@/entities/address';

export const useFlashesStore = defineStore('flashes', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/flashes")
    const flashes = ref<Flash[]>([])
    const isLoading = ref(false)

    async function findAll(
        place: Address | null = null,
        flashDate: Date | null = null, 
        tattooer: {} | null = null,
        name: string | null = null,
        description : string | null = null,
        minPrice: number | null = null,
        maxPrice: number | null = null,
        styles: Style[] = []
    ) {
        isLoading.value = true

        if (place !== null && place.label.length > 0) {
            url.searchParams.set('long', place.coordinates.long.toString())
            url.searchParams.set('lat', place.coordinates.lat.toString())
            url.searchParams.set('maxRange', 50000)
        }

        // if (null !== minPrice) {
        //     url.searchParams.set('minPrice', minPrice.toString())
        // }


        if (maxPrice) {
            url.searchParams.set('maxPrice', maxPrice.toString())
        }

        if (styles.length > 0) {
            const stylesList = []

            styles.forEach((style: any) => {
                stylesList.push(style.name)
            })

            url.searchParams.set('styles', stylesList.join(','))
        }

        console.log(url.href)

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

    return {flashes, isLoading, findAll, findByTattooer, remove, create, update}
})
