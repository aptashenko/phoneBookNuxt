<script setup>
const emit = defineEmits({})
const props = defineProps({
    searchValue: String,
})
console.log(props)
</script>

<template>
    <div class="search">
        <input class="search__input" :value="searchValue" placeholder="Search..."  @input="emit('input', $event.target.value)" />
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