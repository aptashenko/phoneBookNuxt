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
    <div class="flex flex-col">
        <button class="text-right" @click="openAddMenu">
            <span class="material-icons">{{ addNewContact ? 'close' : 'person_add' }}</span>
        </button>
            <div class="w-[70%] mx-auto flex flex-col min-h-158px">
            <Transition name="slide">
                <span v-if="addNewContact">
                    <h2 class="font-bold text-center mb-20px">Add new contact</h2>
                    <form id="addContact" class="" @submit.prevent="onSubmit">
                        <input class="border-1px mb-10px p-5px" name="name" placeholder="name" />
                        <input class="border-1px p-5px" name="phoneNumber" placeholder="phone" />
                    </form>
                    <button form="addContact" type="submit" class="mt-20px bg-green-400 block w-fit py-5px px-10px rounded-10px mx-auto">Submit</button>
                </span>
            </Transition>
            </div>
    </div>
</template>

<style lang="scss">
.slide-enter-active {
  animation: right 1s ease 0s 1 normal forwards;
}

.slide-leave-active {
    transform: translateX(-250px);
    transition: all 250ms ease;
}

.slide-enter /* .list-leave-active до версии 2.1.8 */ {
    animation: right 1s ease 0s 1 normal forwards;
}
.slide-leave-to {
    transform: translateX(-250px);
    transition: all 250ms ease;
}

@keyframes right {
	0% {
		animation-timing-function: ease-in;
		opacity: 0;
		transform: translateX(250px);
	}

	38% {
		animation-timing-function: ease-out;
		opacity: 1;
		transform: translateX(0);
	}

	55% {
		animation-timing-function: ease-in;
		transform: translateX(68px);
	}

	72% {
		animation-timing-function: ease-out;
		transform: translateX(0);
	}

	81% {
		animation-timing-function: ease-in;
		transform: translateX(32px);
	}

	90% {
		animation-timing-function: ease-out;
		transform: translateX(0);
	}

	95% {
		animation-timing-function: ease-in;
		transform: translateX(8px);
	}

	100% {
		animation-timing-function: ease-out;
		transform: translateX(0);
	}
}
</style>