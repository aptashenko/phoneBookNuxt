import axios from 'axios'

const contactsURL = 'https://63376a2b132b46ee0be13d1f.mockapi.io/api/v1/contacts/';
const favoritesURL = 'https://63376a2b132b46ee0be13d1f.mockapi.io/api/v1/favoriteContacts/';

export const state = () => ({
    contactsList: [],
    favorites: [],
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
    },
    getFavorites(state) {
        return state.favorites
    }
}

export const mutations = {
    ADD_CONTACT (state, payload) {
        state.contactsList = [...state.contactsList, payload]
    },
    TOGGLE_FAVORITE (state, payload) {
        const alredyFavorite = state.favorites.some(item => item.id === payload.id)
        if(!alredyFavorite) {
            state.favorites = [...state.favorites, payload]
        } else {
            state.favorites = state.favorites.filter(item => item.id !== payload.id)
        }
    },
    DELETE_CONTACT (state, payload) {
        state.contactsList = state.contactsList.filter(item => item.id !== payload)
    },
    UPDATE_CONTACT(state, payload) {
        state.contactsList = [...state.contactsList.filter(item => item.id !== payload.id), payload]
        state.contactsList.sort((a, b) => Number(a.id) - Number(b.id))
    },
    SET_CONTACTS(state, payload) {
        state.contactsList = payload
    },
    SET_FAVORITES(state, payload) {
        state.favorites = payload
    },
    SORT_CONTACTS_ESC(state) {
        state.contactsList = state.contactsList.sort((a,b) => Date.parse(a.created) - Date.parse(b.created))
    },
    SET_LOADING(state, value) {
        state.spinner = value
    },
    SORT_CONTACTS_DESC(state) {
        state.contactsList = state.contactsList.sort((a,b) => Date.parse(b.created) - Date.parse(a.created))
    }
}

export const actions = {
    async fetchContacts({commit}) {
        commit('SET_LOADING', true)
        const { data } = await axios.get(contactsURL)
        await commit('SET_CONTACTS', data)
        commit('SET_LOADING', false)
    },
    addNewContact({commit}, payload) {
        commit('ADD_CONTACT', payload);
        axios.post(contactsURL, payload)
    },
    removeContact({commit}, payload) {
        commit('DELETE_CONTACT', payload)
        axios.delete(contactsURL+payload)
    },
    editContact({commit}, payload) {
        axios.put(contactsURL+payload.id, payload)
        commit('UPDATE_CONTACT', payload)
    },
    async fetchFavorites({commit}) {
        commit('SET_LOADING', true)
        const { data } = await axios.get(favoritesURL)
        await commit('SET_FAVORITES', data)
        commit('SET_LOADING', false)
    },
    toggleFavorite({commit,state}, payload) {
        const alredyFavorite = state.favorites.some(item => item.name === payload.name)
        commit('TOGGLE_FAVORITE', payload)
        if (alredyFavorite) {
            axios.delete(favoritesURL+payload.id)
        } else {
            axios.post(favoritesURL, payload)
        }
    },
}

//PROBLEM: mockAPI set id to new favorite contacts, so i can't delete 
// by methods DELETE :id, because they are don't matches 
// with contactsList ids;
 