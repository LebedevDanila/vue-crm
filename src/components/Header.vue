<template>
  <header class="header">
    <div class="header__wrap container">
      <router-link to="/" class="header__logo"><img src="../assets/images/logo.svg" alt="Logo"></router-link>
      <img class="header__menu" src="../assets/images/icons/menu.svg" alt="menu">
      <ul class="header__nav">
      <li>
        <router-link active-class="active" to="/" exact> Заказы</router-link>
      </li>
      <li>
        <router-link active-class="active" to="/balance">Расходы и Доходы</router-link>
      </li>
      </ul>
      <a href="#" class="header__account">
      <img @click="logout()" src="../assets/images/icons/logout.svg">
      <span>{{this.$store.getters.info.name}}</span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    }
  }
}
</script>