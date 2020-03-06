import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBrhOMnql_jwg2lL8DlggcqVmoIcabvBI8",
  authDomain: "vue-letterhead.firebaseapp.com",
  databaseURL: "https://vue-letterhead.firebaseio.com",
  projectId: "vue-letterhead",
  storageBucket: "vue-letterhead.appspot.com",
  messagingSenderId: "674858915733",
  appId: "1:674858915733:web:9efeb809c7333f0deb489c",
  measurementId: "G-BP0WYD5W5Q"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})