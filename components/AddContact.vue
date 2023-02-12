<script setup>
import {ref, useContext} from '@nuxtjs/composition-api'

const { $dayjs } = useContext()
const emit = defineEmits({})

const addNewContact = ref(false)

const onSubmit = (e) => {
    const { name, phoneNumber } = e.target;
    const newContact = {
        created: new Date().toISOString(),
        name: name.value,
        phoneNumber: phoneNumber.value
    }
    emit('handleSubmit', newContact)
    e.target.reset()
    addNewContact.value = false;
}

const openAddMenu = () => addNewContact.value = !addNewContact.value

</script>

<template>
    <div class="addContact">
        <button class="addContact__button" @click="openAddMenu">
            <span class="material-icons">{{ addNewContact ? 'close' : 'person_add' }}</span>
        </button>
        <Transition name="slide">
            <div v-if="addNewContact" class="addContact__wrapper">
                <h2 class="addContact__title">Add new contact</h2>
                <form id="addContact" class="addContact__form" @submit.prevent="onSubmit">
                    <input class="addContact__name" name="name" placeholder="name" />
                    <input class="addContact__phone" name="phoneNumber" placeholder="phone" />
                </form>
                <button form="addContact" type="submit" class="addContact__addButton">Add new contact</button>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
.slide-enter-active, .slide-leave-active {
  transition: all 500ms linear;
}
.slide-enter, .slide-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    margin-bottom: -50px;
}
.addContact {
    margin-top: auto;
    &__button {
        display: block;
        border: none;
        cursor: pointer;
        margin-left: auto;
        background: transparent;
    }

    &__form {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    &__title {
        text-align: center;
    }

    &__addButton {
        display: block;
        margin: 20px auto 0;
        background: green;
        color: #fff;
        border: none;
        padding: 5px 8px;
        border-radius: 10px;
        cursor: pointer;
    }
}
</style>