<script setup>
const props = defineProps({
    page: Number,
    pageCount: Number,
})
const emit = defineEmits({})

const pageChange = (nextPage) => {
    emit('handlePage', nextPage)
}
</script>

<template>
    <div>
        <div class="contacts__page">
            <button class="contacts__btn" :disabled="props.page === 1" @click="pageChange(-1)"><span class="material-icons">arrow_back_ios</span></button>
            <button class="contacts__btn" :disabled="props.page === props.pageCount" @click="pageChange(1)"><span class="material-icons">arrow_forward_ios</span></button>
        </div>
        <p class="contacts__pageName">Page: <b>{{ props.page }}</b></p>
    </div>
</template>

<style lang="scss">
.contacts {
    &__page {
        display: flex;
        justify-content: space-evenly;
    }

    &__btn {
        background: transparent;
        border: none;
        cursor: pointer;
    }
}
</style>