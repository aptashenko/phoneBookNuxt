<script setup>
import { useContext, ref } from '@nuxtjs/composition-api';
const { $dayjs } = useContext();
const currentTime = ref($dayjs().format('HH:mm:ss'))
const timer = setInterval(() => {
        currentTime.value = $dayjs().format('HH:mm:ss')
    },1000)

</script>

<template>
    <p class="timer"><b>{{ currentTime }}</b></p>
</template>

<style lang="scss" scoped>
.timer {
    text-align: right;
}
</style>