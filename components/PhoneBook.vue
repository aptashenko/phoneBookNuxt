<script setup>
const props = defineProps({
    filteredContacts: Array,
    searchValue: String,
    loading: Boolean,
    pageCount: Number,
    page: Number,
})
const emits = defineEmits('handleSubmit', 'searchNumber', 'handlePage')

const handleSearch = (value) => {
    emits('searchNumber', value)
}

const handlePageCounter = (value) => {
    // console.log(props.page)
    emits('handlePage', value)
}

</script>

<template>
    <div class="flex flex-col min-h-80vh">
        <TheLoader v-if="props.loading" />
        <div class="flex flex-col h-full justify-between" v-else>
            <SearchMenu 
                :value="props.searchValue"
                :searchValue="props.searchValue"
                @input="handleSearch($event)" />
            <ContactsList 
                v-if="props.filteredContacts.length > 0" 
                :filteredContacts="props.filteredContacts"
                :page="props.page" 
            />
            <h2 v-else>You have no any contact...</h2>
            <div class="mt-10px">
                <AddContact @handleSubmit="emit('handleSubmit')" />
                <PaginationMenu 
                    :page="props.page" 
                    :pageCount="props.pageCount"
                    @handlePage="handlePageCounter"
                />
            </div>
        </div>
    </div>
</template>
