<template>
  <div class="modal__form register">
		<h1 class="modal__form-title">{{this.$route.meta.title}}</h1>
		<input v-model="email" type="text" placeholder="Введите E-mail">
		<input v-model="password" type="password" placeholder="Введите пароль">
		<input v-model="name" type="text" placeholder="Введите свои инициалы">
		<input @click="registration($event)" type="submit" value="Регистрация">
		<router-link class="modal__form-transition" active-class="active" to="/login">У вас уже есть <span>аккаунт</span>?</router-link>
	</div>
</template>

<script>
export default {
	name: 'Register',
	data() {
		return {
			email: '',
			password: '',
			name: ''
		}
	},
	methods: {
		async registration(e) {
      e.preventDefault();

      if(!this.email || !this.password || !this.name) {
				alert('Введите данные');
				return false;
			}

			const registrationData = {
				email: this.email,
				password: this.password,
				name: this.name
			}

      await this.$store.dispatch('register', registrationData);
      this.$router.push('/');
		}
	}
}
</script>
