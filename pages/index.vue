<script setup>
import { computed, ref, useStore, useContext, onMounted, watch, watchEffect } from '@nuxtjs/composition-api'
const { router } = useContext().app
const store = useStore();

const page = ref(Number(router.currentRoute.query.page) || 1)
const contactsOnPage = ref(Number(router.currentRoute.query.limit) || 4)
const filteredContacts = ref([])
const searchValue = ref('')
const currentPage = ref('PhoneBook')

const loading = computed(()=> store.getters.getSpinnerState)
const contacts = computed(()=> store.getters.getContacts)
const favorites = computed(()=> store.getters.getFavorites)

const currentPageContacts = ref(null || contacts.value)

watchEffect(() => {
  switch (currentPage.value) {
    case 'PhoneBook':
      currentPageContacts.value = contacts.value
      // console.log('phoneBook')
      break;
    case 'FavoriteList':
      currentPageContacts.value = favorites.value
      // console.log('favorites')
      break;
    default:
      currentPageContacts.value = contacts.value
  }
})

const paginatedContacts = computed(() => {
    let start = (page.value - 1) * contactsOnPage.value;
    let end = start + contactsOnPage.value
    return currentPageContacts.value.slice(start, end)
})
const pageCount = computed(() => Math.ceil(currentPageContacts.value.length / contactsOnPage.value))

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
        filteredContacts.value = currentPageContacts.value.filter(item => item.phoneNumber.includes(inputValue) || item.name.toLowerCase().includes(inputValue.toLowerCase()))
    } else {
        filteredContacts.value = paginatedContacts.value
    }
}

const changeActivePage = (component) => {
  currentPage.value = component;
}

watch(paginatedContacts, (changed) => {
    if(changed) {
        filteredContacts.value = paginatedContacts.value
    }
} )

onMounted(() => {
    store.dispatch('fetchContacts', {
        page: page.value, 
        limit: contactsOnPage.value
    }).then(() => filteredContacts.value = paginatedContacts.value)
})

</script>

<template>
  <div class="w-350px bg-verydark min-h-70vh mx-auto mt-50px p-10px overflow-hidden">
    <div class="w-full flex gap-10px mb-10px">
      <button 
        class="p-10px transition-color duration-300 hover:(bg-[#c4dfe6] text-verydark)"
        :class="[currentPage === 'PhoneBook' ? 'bg-[#c4dfe6] rounded-10px text-verydark opacity-50' : 'bg-transparent text-light']"
        @click="changeActivePage('PhoneBook')"  
      >All</button>
      <button 
        class="p-10px transition-color duration-300 hover:(bg-[#c4dfe6] text-verydark)"
        :class="[currentPage === 'FavoriteList' ? 'bg-[#c4dfe6] rounded-10px text-verydark opacity-50' : 'bg-transparent text-light']"
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