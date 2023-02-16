<script setup>
import { useContext } from '@nuxtjs/composition-api'
const { router } = useContext().app

console.log(router.currentRoute)
</script>

<script>
export default {
    name: 'IdPage'
}
</script>

<template>
    <div>{{ router.currentRoute.params.id }}</div>
</template>