<script setup>
const emit = defineEmits({})
const props = defineProps({
    searchValue: String,
})
</script>

<template>
    <div class="w-full mb-25px">
        <input class="w-full p-5px border-1px" :value="searchValue" placeholder="Search..."  @input="emit('input', $event.target.value)" />
    </div>
</template>

<style lang="scss">
</style>