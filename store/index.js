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
    editNumber (state, payload) {
        state.contactsList.forEach(item => {
            if (item.id === payload.id) {
                item.phoneNumber = payload.phoneNumber
            }
        })
    },
    setSearchValue(state, payload) {
        state.searchValue = payload
    },
    addContact (state, payload) {
        state.contactsList = [...state.contactsList, payload]
    },
    deleteContact (state, payload) {
        state.contactsList = state.contactsList.filter(item => item.id !== payload)
    },
    editContact (state, payload) {
        state.contactsList.forEach(item => {
            if (item.id === payload.id) {
                item.phoneNumber = payload.phoneNumber
            }
        })
    },
    setContacts (state, payload) {
        state.contactsList = payload
    },
    sortEscContacts(state) {
        state.contactsList = state.contactsList.sort((a,b) => Date.parse(a.created) - Date.parse(b.created))
    },
    setLoading(state, value) {
        state.spinner = value
    },
    sortDescContacts(state) {
        state.contactsList = state.contactsList.sort((a,b) => Date.parse(b.created) - Date.parse(a.created))
    }
}

export const actions = {
    async fetchContacts({commit}) {
        commit('setLoading', true)
        const { data } = await axios.get(baseURL)
        await commit('setContacts', data)
        commit('setLoading', false)
    },
    addNewContact({commit}, payload) {
        commit('addContact', payload);
        axios.post(baseURL, payload)
    },
    removeContact({commit}, payload) {
        commit('deleteContact', payload)
        axios.delete(baseURL+payload)
    },
    editContact({commit}, payload) {
        axios.put(baseURL+payload.id, payload)
        commit('editContact', payload)
    },
}