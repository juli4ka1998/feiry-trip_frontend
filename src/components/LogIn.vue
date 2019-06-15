<template>
    <div>
        <header-template></header-template>
        <div class="auth">
            <v-card xs12 sm6 offset-sm3  :height="currentHeight">
                <v-container fill-height>
                    <v-layout align-center>
                        <div xs12 sm6 md3 class="auth_form">
                            <h1>Вхід у власний кабінет</h1>
                            <label>Логін</label>
                            <div class="text-field">
                                <v-text-field
                                        placeholder="E-mail"
                                        solo
                                        counter
                                        :rules="[rules.required]"
                                        prepend-icon="face"
                                        v-model="email"
                                ></v-text-field>
                            </div>
                            <label>Пароль</label>
                            <div class="text-field">
                                <v-text-field
                                        placeholder="Password"
                                        solo
                                        v-model="password"
                                        prepend-icon="lock"
                                        :append-icon="show ? 'visibility_off' : 'visibility'"
                                        :type="show ? 'text' : 'password'"
                                        :rules="[rules.required, rules.min]"
                                        counter
                                        @click:append="show = !show"
                                ></v-text-field>
                            </div>
                            <div class="text-xs-center login-btn">
                                <v-btn color="success" large @click="signIn()">Увійти</v-btn>
                            </div>

                        </div>
                    </v-layout>
                </v-container>
            </v-card>
        </div>
        <footer-template></footer-template>
    </div>
</template>

<script>
	import axios from 'axios'
    import Header from "./Header"
    import Footer from "./Footer"
	export default {
		data () {
			return {
				currentHeight: '',
				show: false,
				email: '',
				password: '',
				rules: {
					required: value => !!value || 'Обов\'язкове поле.',
					min: v => v.length >= 4 || 'Мінімум 4 символів'
				}
			}
		},
			components: {
				'header-template': Header,
				'footer-template': Footer,
			},
		mounted () {

			if (this.$vuetify.breakpoint.mdAndUp) {
				this.currentHeight = '500px'
			} else {
				this.currentHeight = "100%"
			}
			//localStorage.removeItem('token');
			//localStorage.removeItem('login');
		},
		methods:{
			signIn(){
				axios.request({
						method: 'POST',
						url: "http://localhost:8080/fairy-trip/user/check_user" ,
						headers: {'Content-Type': "application/json", 'X-Requested-With': 'XMLHttpRequest'},
						data: {email: this.email, password: this.password}
					}
				).then((response) => {
					if(response.data) {
						console.log(this.email);
						localStorage.setItem('login', this.email);
						//const token = response.headers.privatekey;
						//let expirationDate = new Date(response.headers.expirationdate);
						//localStorage.setItem('token', token);
						//localStorage.setItem('expirationDate', expirationDate);
						//this.$router.push('admin_home');
						this.$router.replace('/fairytrip/');

					}
				} ).catch(function(error) {
					if (error.response && error.response.status == 401) {
						//console.log(error.response.data);
						alert("Невірний логін або пароль!");

					} }

				);

			},
		}
	}
</script>

<style scoped>
    body {
        font-family: Verdana;
    }
    h1 {
        text-align: center;
        margin-bottom: 30px;
        font-family: Arial;
    }
    .auth {
        /*width: 100%;*/
        margin: 10px;
    }
    .auth_form {
        margin: 0 auto;
        margin-top: 20px;
        width: 40%;

    }
    label {
        font-size: 18px;
        margin-left: 35px;
        font-family: Georgia;
    }
    .login-btn {
        font-family: Arial;
    }
    .text-field {
        margin-top: 10px;
    }
    @media only screen and    (max-width: 600px) {
        .auth {
            margin-top: 0px;
            width: 100%;
            height: 100%;
        }
    }
</style>