<script setup>
const emit = defineEmits({})

const sorting = (type) => {
    emit('sorting', type)
}
</script>

<template>
    <div class="sort">
        <p class="sort__title">Sort by date:</p>
        <div class="sort__buttons">
            <button class="sort__btn" @click="sorting('desc')"><span class="material-icons">expand_less</span></button>
            <button class="sort__btn" @click="sorting('esc')"><span class="material-icons">expand_more</span></button>
        </div>
    </div>
</template>

<style lang="scss">
.sort {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &__buttons {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 5px;
        margin-left: 10px;
    }

    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        background: transparent;
        cursor: pointer;
        border: none;
    }
}
</style>