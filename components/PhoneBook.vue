<script setup>
import { computed, ref, useStore, useContext, onMounted, watch } from '@nuxtjs/composition-api'
import { useLoading } from '~/composables/useLoading'

const { router } = useContext().app
const store = useStore();

const load = useLoading()
console.log('load', load[0])


const page = ref(Number(router.currentRoute.query.page) || 1)
const contactsOnPage = ref(Number(router.currentRoute.query.limit) || 4)
const filteredContacts = ref([])
const searchValue = ref('')
const loading = computed(()=> store.getters.getSpinnerState)

const contacts = computed(()=> store.getters.getContacts)
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

const handleSubmit = (newContact) => store.dispatch('addNewContact', newContact)

const handlePage = (payload) => {
    page.value+=payload
    router.push({query: {
        page: page.value, 
        limit: contactsOnPage.value
    }})
    searchValue.value = ''
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
        <TheLoader v-if="loading" />
        <div v-else>
            <SearchMenu 
                :value="searchValue"
                :searchValue="searchValue"
                @input="searchNumber" />
            <SortingMenu @sorting="handleSorting" />
            <ContactsList 
                v-if="filteredContacts.length > 0" 
                :filteredContacts="filteredContacts"
                :page="page" 
            />
            <h2 v-else>You have no any contact...</h2>
            <AddContact @handleSubmit="handleSubmit" />
            <PaginationMenu 
                :page="page" 
                :pageCount="pageCount"
                @handlePage="handlePage"
            />
        </div>
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