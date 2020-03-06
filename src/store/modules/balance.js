import firebase from 'firebase/app'

export default {
  actions: {
    async fetchTransactions({dispatch, commit}) {
      const uid = await dispatch('getUid');
      const transactionsData = (await firebase.database().ref(`/users/${uid}/balance/transactions`).once('value')).val() || {};
  
      const transactions = [];
      for(const key in transactionsData) {
        transactions.push({id: key, ...transactionsData[key]});
      }

      return transactions;
    },
    async addTransaction({dispatch}, item) {
      const uid = await dispatch('getUid');
      await firebase.database().ref(`/users/${uid}/balance/transactions`).push(item);
    },
    async removeTransaction({dispatch}, id) {
      const uid = await dispatch('getUid');
      await firebase.database().ref(`/users/${uid}/balance/transactions/${id}`).remove();
    }
  },
  getters: {
    transactions: state => state.transactions
  }
}