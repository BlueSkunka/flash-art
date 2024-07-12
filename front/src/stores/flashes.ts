import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import type {Flash} from "@/entities/flash";
import type { Tattooer } from '@/entities/tattooer';
import type { Address } from '@/entities/address';

export const useFlashesStore = defineStore('flashes', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/flashes")
    const flashes = ref<Flash[]>([])
    const flash = ref<Flash>()
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

        flashes.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        url.searchParams.forEach((data, key) => {
            url.searchParams.delete(key)
        })

        isLoading.value = false
    }

    async function findByTattooer(tattooer: User, isBooked: Boolean|null = null) {
        isLoading.value = true
        flashes.value.length = 0
        url.searchParams.set("tattooer", tattooer._id.toString())
        url.searchParams.set("booked", isBooked)

        flashes.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        url.searchParams.delete("tattooer")
        url.searchParams.delete("booked")

        isLoading.value = false
    }

    async function findByUser(user: User) {
        isLoading.value = true
        flashes.value.length=0

        url.searchParams.set("user", user._id.toString())

        flashes.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        url.searchParams.delete("user")

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

    return {flash, flashes, isLoading, findAll, findByTattooer, findByUser, findOne, remove, create, update}
})
