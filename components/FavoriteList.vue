<script setup>
import { computed, ref, useStore, useContext, onMounted, watch } from '@nuxtjs/composition-api'

const { router } = useContext().app
const store = useStore();

const page = ref(Number(router.currentRoute.query.page) || 1)
const contactsOnPage = ref(Number(router.currentRoute.query.limit) || 4)
const filteredContacts = ref([])
const searchValue = ref('')
const loading = computed(()=> store.getters.getSpinnerState)

const contacts = computed(() => store.getters.getFavoriteContacts)
const paginatedContacts = computed(() => {
    let start = (page.value - 1) * contactsOnPage.value;
    let end = start + contactsOnPage.value
    return contacts.value.slice(start, end)
})

const pageCount = computed(() => Math.ceil(contacts.value.length / contactsOnPage.value))

const searchNumber = (inputValue) => {
    searchValue.value = inputValue;
    if (searchValue.value) {
        filteredContacts.value = contacts.value.filter(item => item.phoneNumber.includes(inputValue) || item.name.toLowerCase().includes(inputValue.toLowerCase()))
    } else {
        filteredContacts.value = paginatedContacts.value
    }
}

const handlePage = (payload) => {
    page.value+=payload
    router.push({query: {
        page: page.value, 
        limit: contactsOnPage.value
    }})
    searchValue.value = ''
}

onMounted(() => {
    store.dispatch('fetchFavoriteContacts', {
        page: page.value, 
        limit: contactsOnPage.value
    }).then(() => {
        filteredContacts.value = contacts.value
    })
})

</script>

<template>
    <div class="min-h-70vh">
        <TheLoader v-if="loading" />
        <div class="flex flex-col h-full justify-between" v-else>
            <SearchMenu 
                :value="searchValue"
                :searchValue="searchValue"
                @input="searchNumber" 
            />
            <ContactsList 
                v-if="filteredContacts.length > 0" 
                :filteredContacts="filteredContacts"
                :page="page" 
            />
            <h2 v-else>You have no any contact...</h2>
            <PaginationMenu
                :page="page" 
                :pageCount="pageCount"
                @handlePage="handlePage"
            />
        </div>
    </div>
</template>