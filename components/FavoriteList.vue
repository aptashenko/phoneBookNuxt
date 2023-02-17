<script setup>
import { onMounted } from '@nuxtjs/composition-api';
const props = defineProps({
    filteredContacts: Array,
    searchValue: String,
    loading: Boolean,
    pageCount: Number,
    page: Number,
})
const emits = defineEmits('searchNumber', 'handlePage')

const handleSearch = (value) => {
    emits('searchNumber', value)
}

const handlePageCounter = (value) => {
    emits('handlePage', value)
}

onMounted(()=>{
    console.log('Favorite')
})

</script>

<template>
    <div class="flex flex-col min-h-80vh">
        <TheLoader v-if="props.loading" />
        <div class="flex flex-col h-full justify-between flex-grow" v-else>
            <SearchMenu 
                :value="props.searchValue"
                :searchValue="props.searchValue"
                @input="handleSearch($event)" 
            />
            <ContactsList 
                v-if="props.filteredContacts.length > 0" 
                :filteredContacts="props.filteredContacts"
                :page="props.page" 
            />
            <h2 v-else>You have no any contact...</h2>
            <PaginationMenu
                    :page="props.page" 
                    :pageCount="props.pageCount"
                    @handlePage="handlePageCounter"
            />
        </div>
    </div>
</template>