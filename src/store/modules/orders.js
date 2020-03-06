import firebase from 'firebase/app'

export default {
	state: {
	  orders: []
	},
	mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    clearOrders(state) {
      state.orders = [];
    }
	},
	actions: {
		async fetchOrders({dispatch, commit}) {
      const uid = await dispatch('getUid');
      const ordersData = (await firebase.database().ref(`/users/${uid}/orders`).once('value')).val() || {};

      const orders = [];
      for(const key in ordersData) {
        orders.push({id: key, ...ordersData[key]});
      }

      commit('setOrders', orders);
		},
		async addOrder({dispatch}, newOrder) {
      const uid = await dispatch('getUid');
      await firebase.database().ref(`/users/${uid}/orders`).push(newOrder);

			await dispatch('fetchOrders');
    },
    async removeOrder({dispatch}, id) {
      const uid = await dispatch('getUid');
      await firebase.database().ref(`/users/${uid}/orders/${id}`).remove();

      await dispatch('fetchOrders');
    }
	},
	getters: {
		orders: state => state.orders
	}
}