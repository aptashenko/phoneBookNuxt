import { ref } from '@nuxtjs/composition-api'

export const useToggle = () => {
    const toggle = ref(false)

    const setToggle = () => {
        toggle.value = !toggle.value
    }

    return {toggle, setToggle}
}