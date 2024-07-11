import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";

export const useStylesStore = defineStore('styles', () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/styles"
    const styles = ref<[]>([])
    const isLoading = ref(false)

    async function findAll(name: string | null = null) {
        isLoading.value = true

        if (name) {
            url.searchParams.set("name", name)
        }
        const allStyles = await axios.get(url)
        const {data} = allStyles;
        styles.value = data
        console.log(styles.value)
            // .then(response => {
            //     return response.data
            // })
            // .catch(error => console.log(error))

        isLoading.value = false
    }

    return {styles, findAll, isLoading}
})
