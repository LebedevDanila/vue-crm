<template>
  <div class="balance">
    <h1>{{this.$route.meta.title}}</h1>
    <div class="balance__content">
      <div class="balance__card incomes">
        <h2 class="balance__card-title">Доходы</h2>
        <div v-if="incomes.length" class="balance__card-content">
          <div v-for="(transaction, index) in incomes" class="balance__card-item" :key="index">
            <div class="date">{{transaction.date}}</div>
            <div class="title">{{transaction.desc}}</div>
            <div class="price">{{transaction.price}}</div>
            <div class="delete" @click="removeTransaction(transaction.id, index)">
              <img src="../assets/images/icons/delete.svg" alt="delete">
            </div>
          </div>
        </div>
        <div v-else class="balance__card-content">
          <h2>Пусто</h2>
        </div>
        <div class="balance__card-result">Всего доходов: <span>{{incomesBill}}</span></div>
      </div>
      <div class="balance__card expenses">
        <h2 class="balance__card-title">Расходы</h2>
        <div v-if="expenses.length" class="balance__card-content">
          <div v-for="(transaction, index) in expenses" class="balance__card-item" :key="index">
            <div class="date">{{transaction.date}}</div>
            <div class="title">{{transaction.desc}}</div>
            <div class="price">{{transaction.price}}</div>
            <div class="delete" @click="removeTransaction(transaction.id, index)">
              <img src="../assets/images/icons/delete.svg" alt="delete">
            </div>
          </div>
        </div>
        <div v-else class="balance__card-content">
          <h2>Пусто</h2>
        </div>
        <div class="balance__card-result">Всего расходов: <span>{{expensesBill}}</span></div>
      </div>
    </div>
    <form class="balance__form" @submit.prevent="addTransaction()">
      <h2>Добавить:</h2>
      <input v-model="inputs.date" id="date" type="date">
      <input v-model="inputs.desc" type="text" placeholder="Описание покупки">
      <input v-model="inputs.price" type="text" placeholder="Цена">
      <input type="submit" value="Добавить новый">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Balance',
  data() {
    return {
      inputs: {
        date: '',
        desc: '',
        price: ''
      },
      transactions: [],
      incomesBill: 0,
      expensesBill: 0
    }
  },
  async mounted() {
    this.transactions = await this.$store.dispatch('fetchTransactions');
  },
  computed: {
    incomes() {
      this.incomesBill = 0;
      return this.transactions.filter(item => {
        if(item.price > 0) {
          this.incomesBill += item.price;
          return true;
        }
      });
    },
    expenses() {
      this.expensesBill = 0;
      return this.transactions.filter(item => {
        if(item.price < 0) {
          this.expensesBill -= item.price;
          return true;
        }
      });
    }
  },
  methods: {
    async addTransaction() {
      if(!this.inputs.date || !this.inputs.desc || !this.inputs.price) {
        alert('Введите значение!');
        return false;
      }

      const item = {
        date: this.inputs.date.trim(),
        desc: this.inputs.desc.trim(),
        price: this.convertToNumber(this.inputs.price)
      }

      /* add to database */
      await this.$store.dispatch('addTransaction', item);
      /* add to front-end */
      this.transactions.push(item);

      /* clear field */
      for(const key in this.inputs) {
        this.inputs[key] = '';
      }
    },
    convertToNumber(str){
      str = str.replace(/\s/g, '');
      return Number(str);
    },
    async removeTransaction(id, index) {
      /* remove to database */
      await this.$store.dispatch('removeTransaction', id);
      /* remove to front-end */
      this.transactions.find((item, index) => item.id === id ? this.transactions.splice(index, 1) : false);
    }
  }
}
</script>