import { ref } from '@nuxtjs/composition-api'

export const useLoading = () => {
    const loading = ref(false)

    const setLoading = (value) => {
        loading.value = value
    }

    return [loading.value, setLoading]
}