import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
	state: {
		//activePage: 'commodities',
		search: '',
		selectedItem: {
			title:'Взуття'
		},
		commodityData: {},
		photo: ''
	},
	getters: {
		// activePage: state => {
		// 	return state.activePage;
		// },
		search: state => {
			return state.search;
		},
		selectedItem: state => {
			return state.selectedItem;
		},
		commodityData: state => {
			return state.commodityData;
		},
		photo: state => {
			return state.photo;
		},
	},
	mutations: {
		// homePage: state => {
		// 	state.activePage = 'home'
		// },
		// commoditiesPage: (state, item) => {
		// 	state.activePage = 'commodities';
		// 	state.selectedItem = item;
		// },
		changeSearch: (state, value) => {
			state.search = value
		},
		changeItem: (state, value) => {
			state.selectedItem = value;
		},
		changeData: (state, data) => {
			state.commodityData = data;
		},
		changePhoto: (state, value) => {
			state.photo = value
		},
	},
	actions: {
		// homePage: ({ commit }) => {
		// 	commit('homePage');
		// },
		// commoditiesPage: ({ commit }, item) => {
		// 	commit('commoditiesPage', item);
		// },
		changeSearch: ({ commit }, value) => {
			commit('changeSearch', value);
		},
		changeItem: ({ commit }, value) => {
			commit('changeItem', value);
		},
		changeData: ({ commit }, data) => {
			commit('changeData', data);
		},
		changePhoto: ({ commit }, value) => {
			commit('changePhoto', value);
		},
	}
});