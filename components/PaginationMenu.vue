<script setup>
const props = defineProps({
    page: Number,
    pageCount: Number,
})
const emit = defineEmits('handlePage')

const pageChange = (value) => {
    emit('handlePage', value)
}

</script>

<template>
    <div>
        <div class="flex justify-evenly items-center my-20px">
            <button class="bg-transparent border-none cursor-pointer" @click="pageChange(-1)" :disabled="props.page === 1"><span class="material-icons">arrow_back_ios</span></button>
            <p class="text-center">Page: <b>{{ props.page }}</b></p>
            <button class="bg-transparent border-none cursor-pointer" @click="pageChange(1)" :disabled="props.page === props.pageCount"><span class="material-icons">arrow_forward_ios</span></button>
        </div>
    </div>
</template>