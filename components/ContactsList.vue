<script setup>
import {useStore} from '@nuxtjs/composition-api'
const store = useStore();

const props = defineProps({
    filteredContacts: {
        type: Array,
        required: true,
        default: [],
    },
    page: {
        type: Number
    }
})

const removeContact = (id) => store.dispatch('removeContact', id)
const editPhoneNumber = (newContact) => store.dispatch('editContact', newContact)
const handleSorting = (type) => {
    if (type === 'esc') {
        store.commit('sortEscContacts')
    } else if (type === 'desc') {
        store.commit('sortDescContacts')
    }
}
</script>

<template>
    <div>
        <SortingMenu @sorting="handleSorting" />
        <ul  class="contacts__list">
            <ContactItem 
                v-for="(item, idx) of filteredContacts"
                :item="item"
                :key="idx"
                :page="page"
                @editPhoneNumber="editPhoneNumber"
                @removeContact="removeContact"
            />
        </ul>
    </div>
</template>


<style lang="scss">
.contacts {
    &__list {
        padding: 0;
    }
}
</style>