<script setup>
const emit = defineEmits({})
const props = defineProps({
    searchValue: String,
})
</script>

<template>
    <div class="w-full mb-25px">
        <input class="w-100px p-10px rounded-2 bg-middle text-light placeholder-white anim" :value="searchValue" placeholder="Search..."  @input="emit('input', $event.target.value)" />
    </div>
</template>

<style lang="scss">
@keyframes widthLength {
    from {
        width: 100px;
    }
    to {
        width: 100%;
    }
}

.anim:hover {
    animation: widthLength 200ms linear forwards;
}
</style>