<template>
	<div class="modal__form login">
		<h1 class="modal__form-title">{{this.$route.meta.title}}</h1>
		<input v-model="email" type="text" placeholder="Введите E-mail">
		<input v-model="password" type="password" placeholder="Введите пароль">
		<input @click="login($event)" type="submit" value="Войти">
		<router-link class="modal__form-transition" active-class="active" to="/register">У вас нету <span>аккаунта</span>?</router-link>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		async login(e) {
			e.preventDefault();

			if(!this.email || !this.password) {
				alert('Введите данные');
				return false;
			}

			const authData = {
				email: this.email,
				password: this.password
			}

			await this.$store.dispatch('login', authData);
			this.$router.push('/');
		}
	}
}
</script>