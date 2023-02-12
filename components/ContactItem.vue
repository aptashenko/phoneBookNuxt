<script setup>
import { ref, useContext} from '@nuxtjs/composition-api'
const props = defineProps({
    item: Object,
});

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

</script>

<template>
    <li class="contactItem">
        <div class="contactItem__top">
            <div class="contactItem__card">
                <p class="contactItem__name"><strong>{{ props.item.name }}</strong></p>
                <p class="contactItem__name">{{ $dayjs(props.item.created).format('DD.MM.YYYY (HH:mm)') }}</p>
                <button class="contactItem__buttonShow" @click="handleDetails(props.item)">
                    <span class="material-icons">{{ details ? 'visibility_off' : 'visibility' }}</span>
                </button>
            </div>
            <button class="contactItem__deleteButton" @click="handleRemove(props.item.id)">
                <span class="material-icons">delete</span>
            </button>
        </div>
        <Transition name="slide">
        <div v-if="details" class="contactItem__bottom">
            <div class="contactItem__data">
                <input 
                    v-if="editNumber"
                    class="contactItem__input" 
                    :value="props.item.phoneNumber" 
                    @keyup.enter="handleEdit(props.item, $event.target.value)" 
                    @blur="handleEdit(props.item, $event.target.value)" 
                />
                <p 
                    v-else 
                    class="contactItem__phone" 
                    @click="openPhoneEditor">
                    Phone: {{ props.item.phoneNumber }}
                </p>
            </div>
            <button 
                class="contactItem__edit" 
                @click="openPhoneEditor"
            ><span class="material-icons">edit</span>
            </button>
        </div>
        </Transition>
    </li>
</template>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 500ms linear;
}
.slide-enter, .slide-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    margin-top: -30px;
}
.contactItem {

    border: 1px solid #000;
    &:not(:last-child) {
        margin-bottom: 20px;
    }

    &__name {
        flex: 1;
        font-size: 13px;
    }

    &__card {
        display: flex;
        flex: 1;
        align-items: center;
        text-align: center;
    }

    &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    &__bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    &__buttonShow {
        display: flex;
        background: transparent;
        border: none;
        cursor: pointer;
    }
    &__edit {
        background: transparent;
        border: none;
        cursor: pointer;
    }
    &__input {
        width: 100%;
    }

    &__created {
        font-size: 14px;
    }
    &__phone {
        font-size: 14px;
    }

    &__deleteButton {
        display: flex;
        background: transparent;
        border: none;
        padding: 1px;
        border-radius: 10px;
        cursor: pointer;
        margin-left: 10px;
        transition: all .25s linear;
        
        &:hover {
            transform: scale(1.2);
        }
    }
}
</style>