<script setup>
import {computed} from '@nuxtjs/composition-api'
const props = defineProps({
    page: Number,
    pageCount: Number,
})
const emit = defineEmits('handlePage')

const currentPage = computed(() => props.page)

const pageChange = (e) => {
    const buttonIndex = e.target.parentNode.dataset.index
    if (!buttonIndex && e.target.nodeName === 'BUTTON') {
        return
    }
    emit('handlePage', Number(buttonIndex))
    console.log(currentPage.value)
}

</script>

<template>
    <div>
        <div class="flex justify-evenly items-center my-20px" @click="pageChange">
            <button class="bg-transparent border-none cursor-pointer" data-index="-1" :disabled="currentPage === 1"><span class="material-icons">arrow_back_ios</span></button>
            <p class="text-center">Page: <b>{{ props.page }}</b></p>
            <button class="bg-transparent border-none cursor-pointer" data-index="1" :disabled="props.page === props.pageCount"><span class="material-icons">arrow_forward_ios</span></button>
        </div>
    </div>
</template>