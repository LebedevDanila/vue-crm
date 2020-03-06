<template>
  <div class="orders">
    <div class="search">
      <h1>{{this.$route.meta.title}}</h1>
      <form>
        <img v-if="searchInput.length" @click="reset()" class="reset" src="../assets/images/icons/refresh.svg">
        <input v-model="searchInput" type="text" placeholder="Найти клиента...">
        <button type="submit" @click="searchOrder($event)"><img src="../assets/images/icons/search.svg" alt="search"></button>
      </form>
    </div>
    <div class="overflow__wrapper">
      <table class="table orders__table">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Комплект</th>
            <th>Телефон</th>
            <th>Откуда узнали</th>
            <th>Стоимость</th>
            <th>Устройство</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="this.$store.getters.orders.length">
          <tr v-for="(order, index) in this.$store.getters.orders" :key="index">
            <td>{{index+1}}</td>
            <td>{{order.fullName}}</td>
            <td>{{order.kit}}</td>
            <td>{{order.phone}}</td>
            <td>{{order.promotion}}</td>
            <td>{{order.price}}</td>
            <td>{{order.device}}</td>
            <td><div class="btn update"><img src="../assets/images/icons/update.svg" alt="update"></div></td>
            <td><div class="btn delete" @click="removeOrder(order.id)"><img src="../assets/images/icons/delete.svg" alt="delete"></div></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td colspan="9"><h3>У вас нету заказов!</h3></td></tr>
        </tbody>
        <tbody>
          <tr v-if="isOpenForm">
            <td></td>
            <td><input v-model="inputs.fullName" type="text" placeholder="ФИО"></td>
            <td><input v-model="inputs.kit" type="text" placeholder="Комплект"></td>
            <td><input v-model="inputs.phone" type="text" placeholder="Телефон"></td>
            <td><input v-model="inputs.promotion" type="text" placeholder="Откуда узнали"></td>
            <td><input v-model="inputs.price" type="text" placeholder="Стоимость"></td>
            <td><input v-model="inputs.device" type="text" placeholder="Устройство"></td>
            <td colspan="2"><div class="btn send" @click="addOrder()"><img src="../assets/images/icons/send.svg" alt=""></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="isOpenForm ? 'close' : 'open'" class="btn adding-btn" @click="toggleForm()">
      <img v-if="isOpenForm" src="../assets/images/icons/cancel.svg" alt="">
      <img v-else src="../assets/images/icons/add.svg" alt="">
      {{isOpenForm ? 'Отмена' : 'Добавить'}}
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      inputs: {
        fullName: '',
        kit: '',
        phone: '',
        promotion: '',
        price: '',
        device: ''
      },
      isOpenForm: false,
      searchInput: ''
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchOrders');
  },
  methods: {
    ...mapMutations(['setOrders']),
    async addOrder() {
      /* validate field */
      for(const key in this.inputs) {
        if(!this.inputs[key]) {
          alert('Введите значение');
          return false;
        }
      }

      const newOrder = {...this.inputs};
      await this.$store.dispatch('addOrder', newOrder);

      /* clear field */
      for(const key in this.inputs) {
        this.inputs[key] = '';
      }
    },
    async removeOrder(id) {
      await this.$store.dispatch('removeOrder', id);
    },
    toggleForm() {
      this.isOpenForm = !this.isOpenForm;
    },
    searchOrder(e) {
      e.preventDefault();

      if(!this.searchInput) {
        alert('Введите значение!');
        return false;
      }
      // const filteredOrders = this.$store.getters.orders.filter(item => item.fullName.toLowerCase().includes(this.searchInput.trim().toLowerCase()));
      const filteredOrders = this.$store.getters.orders.filter(item => {
        if(item.fullName.toLowerCase().includes(this.searchInput.trim().toLowerCase())) {
          return item;
        }
      })

      if(filteredOrders.length) {
        this.setOrders(filteredOrders);
      } else {
        alert('Такого клиента нету!');
      }
    },
    async reset() {
      await this.$store.dispatch('fetchOrders');
      
      this.searchInput = '';
    }
  },
  components: {

  }
}
</script>
