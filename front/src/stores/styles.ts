import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";

export const useStylesStore = defineStore('styles', () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/styles")
    const styles = ref<Style[]>([])
    const isLoading = ref(false)

    async function findAll(name: string | null = null) {
        isLoading.value = true

        if (name) {
            url.searchParams.set("name", name)
        }

        styles.value = await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(error => console.log(error))

        isLoading.value = false
    }

    return {styles, findAll}
})
