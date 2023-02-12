<script setup>
import { computed, ref, useStore, useContext, onMounted, watch } from '@nuxtjs/composition-api'
const { router } = useContext().app
const store = useStore();

const page = ref(Number(router.currentRoute.query.page) || 1)
const contactsOnPage = ref(Number(router.currentRoute.query.limit) || 4)
const filteredContacts = ref([])

const contacts = computed(()=> store.getters.getContacts)
const paginatedContacts = computed(() => {
    let start = (page.value - 1) * contactsOnPage.value;
    let end = start + contactsOnPage.value
    return contacts.value.slice(start, end)
})

const pageCount = computed(() => Math.ceil(contacts.value.length / contactsOnPage.value))

const searchNumber = (number) => {
    if (number) {
        filteredContacts.value = contacts.value.filter(item => item.phoneNumber.includes(number))
    } else {
        filteredContacts.value = paginatedContacts.value
    }
}

const handleSubmit = (newContact) => store.dispatch('addNewContact', newContact)

const handlePage = (payload) => {
    page.value+=payload
    router.push({query: {
        page: page.value, 
        limit: contactsOnPage.value
    }})
}

const handleSorting = (type) => {
    if (type === 'esc') {
        store.commit('sortEscContacts')
    } else if (type === 'desc') {
        store.commit('sortDescContacts')
    }
}

onMounted(() => {
    store.dispatch('fetchContacts', {
        page: page.value, 
        limit: contactsOnPage.value
    })
})

watch(paginatedContacts, () => {
    filteredContacts.value = paginatedContacts.value
})

</script>

<template>
    <div class="contacts">
        <SearchMenu @searchNumber="searchNumber"/>
        <SortingMenu @sorting="handleSorting" />
        <ContactsList 
            v-if="filteredContacts.length > 0" 
            :filteredContacts="filteredContacts" />
        <h2 v-else>You have no any contact...</h2>
        <AddContact @handleSubmit="handleSubmit" />
        <PaginationMenu 
            :page="page" 
            :pageCount="pageCount"
            @handlePage="handlePage"
        />
    </div>
</template>

<style lang="scss" scoped>
.contacts {
    display: flex;
    flex-direction: column;
    
    padding: 10px;
    border: 1px solid #000;
    min-height: 500px;
}

</style>