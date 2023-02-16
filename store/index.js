import axios from 'axios'

const baseURL = 'https://63376a2b132b46ee0be13d1f.mockapi.io/api/v1/contacts/';

export const state = () => ({
    contactsList: [],
    searchValue: '',
    spinner: false,
})
  
export const getters = {
    getContacts(state) {
        return state.contactsList
    },
    getSearchValue(state) {
        return state.searchValue
    },
    getSpinnerState(state) {
        return state.spinner
    }
}

export const mutations = {
    setSearchValue(state, payload) {
        state.searchValue = payload
    },
    ADD_CONTACT (state, payload) {
        state.contactsList = [...state.contactsList, payload]
    },
    DELETE_CONTACT (state, payload) {
        state.contactsList = state.contactsList.filter(item => item.id !== payload)
    },
    UPDATE_CONTACT(state, payload) {
        state.contactsList.forEach(item => {
            if (item.id === payload.id) {
                item = payload
            }
        })
    },
    SET_CONTACTS(state, payload) {
        state.contactsList = payload
    },
    sortEscContacts(state) {
        state.contactsList = state.contactsList.sort((a,b) => Date.parse(a.created) - Date.parse(b.created))
    },
    SET_LOADING(state, value) {
        state.spinner = value
    },
    sortDescContacts(state) {
        state.contactsList = state.contactsList.sort((a,b) => Date.parse(b.created) - Date.parse(a.created))
    }
}

export const actions = {
    async fetchContacts({commit}) {
        commit('SET_LOADING', true)
        const { data } = await axios.get(baseURL)
        await commit('SET_CONTACTS', data)
        commit('SET_LOADING', false)
    },
    addNewContact({commit}, payload) {
        commit('ADD_CONTACT', payload);
        axios.post(baseURL, payload)
    },
    removeContact({commit}, payload) {
        commit('DELETE_CONTACT', payload)
        axios.delete(baseURL+payload)
    },
    editContact({commit}, payload) {
        axios.put(baseURL+payload.id, payload)
        commit('UPDATE_CONTACT', payload)
    },
}