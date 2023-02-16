<script setup>
const emit = defineEmits({})

const sorting = (type) => {
    emit('sorting', type)
}
</script>

<template>
    <div class="flex items-center justify-end">
        <p class="flex-1 text-11px">Sort by date:</p>
        <div class="">
            <button class="transform transition duration-300 hover:scale-120" @click="sorting('desc')"><span class="material-icons">expand_less</span></button>
            <button class="transform transition duration-300 hover:scale-120" @click="sorting('esc')"><span class="material-icons">expand_more</span></button>
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