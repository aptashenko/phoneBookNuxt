<script setup>
import { computed, ref, useStore, useContext, onMounted, watch } from '@nuxtjs/composition-api'
const { router } = useContext().app
const store = useStore();

const page = ref(Number(router.currentRoute.query.page) || 1)
const contactsOnPage = ref(Number(router.currentRoute.query.limit) || 4)
const filteredContacts = ref([])
const searchValue = ref('')
const loading = computed(()=> store.getters.getSpinnerState)
const contacts = computed(()=> store.getters.getContacts)
const favorites = computed(()=> store.getters.getFavorites)
const paginatedContacts = computed(() => {
    let start = (page.value - 1) * contactsOnPage.value;
    let end = start + contactsOnPage.value
    return contacts.value.slice(start, end)
})
const pageCount = computed(() => Math.ceil(contacts.value.length / contactsOnPage.value))

const handlePage = (payload) => {
    page.value+=payload
    router.push({query: {
        page: page.value, 
        limit: contactsOnPage.value
    }})
    searchValue.value = ''
}

const handleSubmit = (newContact) => store.dispatch('addNewContact', newContact)


const searchNumber = (inputValue) => {
  searchValue.value = inputValue;
    searchValue.value = inputValue;
    if (searchValue.value) {
        filteredContacts.value = contacts.value.filter(item => item.phoneNumber.includes(inputValue) || item.name.toLowerCase().includes(inputValue.toLowerCase()))
    } else {
        filteredContacts.value = paginatedContacts.value
    }
}

const currentPage = ref('PhoneBook')
const changeActivePage = (component) => {
  currentPage.value = component;

}

watch(paginatedContacts, (changed) => {
    if(changed) {
        filteredContacts.value = paginatedContacts.value
    }
} )

watch(favorites, (changed) => {
  console.log('hello')
})

onMounted(() => {
    store.dispatch('fetchContacts', {
        page: page.value, 
        limit: contactsOnPage.value
    }).then(() => filteredContacts.value = paginatedContacts.value)
})

</script>

<template>
  <div class="w-350px min-h-70vh mx-auto mt-50px border-1px p-10px overflow-hidden">
    <div class="w-full flex gap-10px mb-10px">
      <button 
        class="border-1px p-10px transition-color duration-300 hover:(bg-yellow-500 text-[#fff])"
        :class="[currentPage === 'PhoneBook' ? 'bg-yellow-500 text-[#fff]' : 'bg-transparent']"
        @click="changeActivePage('PhoneBook')"  
      >All</button>
      <button 
        class="border-1px p-10px transition-color duration-300 hover:(bg-yellow-500 text-[#fff])"
        :class="[currentPage === 'FavoriteList' ? 'bg-yellow-500 text-[#fff]' : 'bg-transparent']"
        @click="changeActivePage('FavoriteList')"  
      >Favorite</button>
    </div>
    <KeepAlive>
      <component 
       :is="currentPage"
       :filteredContacts="filteredContacts"
       :searchValue="searchValue"
       :loading="loading"
       :pageCount="pageCount"
       :page="page"
       @handlePage="handlePage"
       @handleSubmit="handleSubmit"
       @searchNumber="searchNumber"
      />
    </KeepAlive>
    <CurrentTimer />
  </div>
</template>