import { ref } from '@nuxtjs/composition-api'

export const useToggle = () => {
    const toggle = ref()
    const setToggle = (initValue) => {
        toggle.value = !initValue
    }

    return {toggle, setToggle}
}