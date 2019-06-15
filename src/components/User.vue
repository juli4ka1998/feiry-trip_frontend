<template >
    <div>
        <header-template></header-template>
        <div class="form">
            <div style="width: 60%; margin: 0 auto">
                <h1 style="text-align: center; margin-top: 20px; margin-bottom: 20px">Власний кабінет</h1>
            <div class="image">
                <img width="100%" v-if="url" :src="url" />
            </div>
            <div class="user-data">

                <div style="float: left; margin-right: 10%">
                    <p style="margin-top: 30px" >{{ user_data.lastname + ' ' + user_data.name + ' ' + user_data.surname}}</p>
                    <p class="margin"  >День народження: {{ user_data.birthdayDate.slice(0,10)}}</p>
                    <p class="margin">Телефон: {{ user_data.number}}</p>
                </div>
                <div style="float: left">
                    <p style="margin-top: 30px" >E-mail: {{ user_data.email}}</p>
                    <p  class="margin">Стать: {{ user_data.sex}}</p>
                    <p class="margin" style="cursor: pointer" >Мої замовлення</p>
                </div>
            </div>

                <div style="margin: 0 auto; width: 20%; padding-top: 20px; clear: both"><v-btn dark style="background-color: #08c708; width: 100%">Редагувати</v-btn></div>

            </div>




        </div>
        <footer-template></footer-template>
    </div>

</template>

<script>
	import Header from "./Header"
	import Footer from "./Footer"
	import axios from 'axios'
	export default {
		data: () => ({
			url: require('../images/nobody.jpg'),
			user_data: {
				name: '',
				lastname: '',
				surname: '',
				email: '',
				number: '',
				birthdayDate: '',
				sex: ''
			},

		}),
		components: {
			'header-template': Header,
			'footer-template': Footer,
		},
		computed: {},
		mounted() {
			//this.url = localStorage.getItem('q');
          let login = localStorage.getItem('login');
          if(login != null){
            let qs = require('qs');
            axios.request({
                method: 'POST',
                url: "http://localhost:8080/fairy-trip/user" ,
                headers: {'Content-Type': "application/x-www-form-urlencoded", 'X-Requested-With': 'XMLHttpRequest'},
                data: qs.stringify({email: login})
              }
            ).then((response) => {
              this.user_data = response.data;
              this.url = "http://localhost:8080" + response.data.photoPath;
            });
          }
		},
		methods: {

		}
	}
</script>

<style scoped>
    .image {
        width: 204px;
        height: 204px;
        border: 1.5px #55d5fe solid;
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        background-color: whitesmoke;
        margin-top: 10px;
        float: left;
        margin-right: 30px;
    }
    .image:hover {
        box-shadow: 0px 0px 10px rgba(.8,.8,.8,.8);
    }
    .form {
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 400px;
        /*padding-right: 70px;*/
        margin-top: 10px;
        padding: 15px;
        padding-top: 5px;
        background-color: white;
        margin: 10px;
    }
    .user-data{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .margin {
        margin-top: 45px;
    }
</style>