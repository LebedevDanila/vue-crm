import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'

import Orders from '@/pages/Orders.vue'
import Balance from '@/pages/Balance.vue'
import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Orders',
    meta: {
      title: 'Заказы',
      layout: 'Main',
      auth: true
    },
    component: Orders
  },
  {
    path: '/balance',
    name: 'Balance',
    meta: {
      title: 'Расходы и доходы',
      layout: 'Main',
      auth: true
    },
    component: Balance
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Регистрация',
      layout: 'Empty'
    },
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Вход в систему',
      layout: 'Empty'
    },
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if(requireAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
})

export default router
