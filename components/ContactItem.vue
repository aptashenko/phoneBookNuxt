<script setup>
import { ref, useContext, useStore, computed, watch} from '@nuxtjs/composition-api'
import { useToggle } from '~/composables/useToggle'
const props = defineProps({
    item: Object,
    page: Number,
});

const store = useStore();

const currentPage = computed(() => props.page)

const {toggle, setToggle} = useToggle(props.item.favorite);

const { $dayjs } = useContext()
const emit = defineEmits({})

const details = ref(false)
const editNumber = ref(false)

const handleDetails = () => {
    details.value = !details.value
}

const openPhoneEditor = () => {
    editNumber.value = true
}

const handleEdit = (contact, newPhone) => {
    const editedContact = {...contact};
    editedContact.phoneNumber = newPhone
    emit('editPhoneNumber', editedContact)
    editNumber.value = false
}

const handleRemove = (id) => {
    emit('removeContact', id)
}

const addToFavorite = (oldContact) => {
    setToggle(props.item.favorite)
    const updatedContact = new Map(Object.entries(oldContact))
    updatedContact.set('favorite', toggle.value)
    store.dispatch('editContact', Object.fromEntries(updatedContact))
}

watch(currentPage, () => {
    details.value = false
})


</script>

<template>
    <li class="border-b-1px flex flex-col py-5px cursor-pointer hover:(bg-[] text-verydark)" @click="handleDetails(props.item)">
        <div class="flex justify-between items-center">
            <p class=""><strong>{{ props.item.name }}</strong></p>
            <button class="" @click="handleDetails(props.item)">
                <span class="material-symbols-outlined">{{ details ? 'close' : 'info' }}</span>
            </button>
        </div>
        <Transition name="show">
        <div v-show="details" class="">
            <div class="">
                <input 
                    v-if="editNumber"
                    class="" 
                    :value="props.item.phoneNumber" 
                    @keyup.enter="handleEdit(props.item, $event.target.value)" 
                    @blur="handleEdit(props.item, $event.target.value)" 
                />
                <p 
                    v-else 
                    class="" 
                    @click="openPhoneEditor">
                    Номер телефона: {{ props.item.phoneNumber }}
                </p>
                <p class="">
                    Создано: {{ $dayjs(props.item.created).format('DD.MM.YYYY (HH:mm)') }}
                </p>
            </div>
            <div class="">
                <button 
                    class="" 
                    @click="openPhoneEditor"
                ><span class="material-icons">edit</span>
                </button>
                <button 
                    class=""
                    @click="addToFavorite(props.item)"
                >
                    <span class="material-symbols-outlined" :class="{filled: props.item.favorite}">
                        favorite
                    </span>
                </button>
                <button class="" @click="handleRemove(props.item.id)">
                <span class="material-icons">delete</span>
            </button>
            </div>
        </div>
        </Transition>
    </li>
</template>

<style lang="scss" scoped>
.filled-none {
  font-variation-settings:'FILL' 0
}

.filled {
    font-variation-settings: 'FILL' 1;
}

.show-enter {
    transition: all 500ms ease;
    margin-top: -48px;
    opacity: 0;
}

.show-enter-active {
    transition: all 500ms ease;
}

.show-enter-to {
    transition: all 500ms .2s ease;
    opacity: 1;
}

.show-leave {
    transition: all 500ms ease;
    opacity: 0;
}
.show-leave-active {
    transition: all 500ms ease;
    opacity: 0;
}
.show-leave-to {
    transition: all 500ms .2s ease;
    opacity: 0;
    margin-top: -50px;
} 

</style>