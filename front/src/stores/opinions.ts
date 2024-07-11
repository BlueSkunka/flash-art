import {defineStore} from "pinia";
import {ref} from "vue";
import {Opinion} from "@/entities/opinion";
import type {User} from "@/entities/user";
import axios from "axios";
import type {Tattooer} from "@/entities/tattooer";

export const useOpinionStore = defineStore('opinions', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + '/opinions')
    const opinions = ref<Opinion[]>([])
    const isLoading = ref(false)
    const average = ref(0)

    async function findByTattooer(tattooer: User) {
        isLoading.value = true

        url.href = url.href + '/tattooer/' + tattooer._id.toString()
        opinions.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(err => console.error(err))

        isLoading.value = false
    }

    const getAvgRating = () => {
        let sum = 0;
        opinions.value.forEach(opinion => {
            sum += opinion.rate
        })

        average.value = sum / opinions.value.length
    }

    return {opinions, average, findByTattooer, isLoading}
})