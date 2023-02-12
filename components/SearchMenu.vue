<script setup>
const emit = defineEmits({})
</script>

<template>
    <div class="search">
        <input class="search__input" placeholder="Search..." @input="emit('searchNumber', $event.target.value)" />
    </div>
</template>

<style lang="scss">
.search {
    width: 100%;
    margin-bottom: 25px;

    &__input {
        width: 100%;
        padding: 5px;
    }
}
</style>