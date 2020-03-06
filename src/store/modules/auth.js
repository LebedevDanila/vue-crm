import firebase from 'firebase/app'

export default {
  actions: {
    async login(ctx, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch(e) {
        throw e;
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      
      commit('clearInfo');
      commit('clearOrders');
      commit('clearTransactions');
    },
    async register({dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const uid = await dispatch('getUid');
        
        await firebase.database().ref(`/users/${uid}`).set({
          info: {
            name
          }
        });
      } catch(e) {
        throw e;
      }
    },
    async getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
}