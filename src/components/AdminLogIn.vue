<template>
    <div class="auth">
        <v-card xs12 sm6 offset-sm3  :height="currentHeight">
            <v-container fill-height>
            <v-layout align-center>
                <div xs12 sm6 md3 class="auth_form">
                    <h1>Виконайте вхід у систему</h1>
                    <label>Логін</label>
                    <div class="text-field">
                        <v-text-field
                                placeholder="Username"
                                solo
                                counter
                                :rules="[rules.required]"
                                prepend-icon="face"
                                v-model="username"
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

</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                currentHeight: '',
                show: false,
                username: '',
                password: '',
                rules: {
                    required: value => !!value || 'Обов\'язкове поле.',
                    min: v => v.length >= 4 || 'Мінімум 4 символів'
                }
            }
        },
        mounted () {

            if (this.$vuetify.breakpoint.mdAndUp) {
                this.currentHeight = '500px'
            } else {
                this.currentHeight = "100%"
            }
            localStorage.removeItem('token');
            localStorage.removeItem('login');
        },
        methods:{
            signIn(){
                //this.$emit('admin_name', this.username);
                localStorage.setItem('login', this.username);
                axios.request({
                        method: 'POST',
                        url: "http://localhost:8080/fairy-trip/admin/check_admin" ,
                        headers: {'Content-Type': "application/json", 'X-Requested-With': 'XMLHttpRequest'},
                        data: {login: this.username, password: this.password}
                    }
                ).then((response) => {
                    //console.log(response.status);
                    if(response.data) {

                        const token = response.headers.privatekey;
                        let expirationDate = new Date(response.headers.expirationdate);
                        //expirationDate = response.headers.expirationdate;
                        //const refreshLink = response.headers.refreshlink;
                        localStorage.setItem('token', token);
                        localStorage.setItem('expirationDate', expirationDate);
                        //localStorage.setItem('refreshLink', refreshLink);
                        //var milliseconds = expirationDate.getTime();
                        //var currentmillis= new Date().getTime();
                        this.$router.push('/fairytrip/adminHome');
                        console.log(token);
                        console.log(expirationDate);
                        // const self = this;
                        // //this.$emit('refreshToken', token, refreshLink);
                        // setTimeout(() => {
                        //     self.$emit('refreshToken', token);
                        // }, (3000));
                        //setTimeout(() => {this.refresh(token, refreshLink)}, (milliseconds - currentmillis)/2);


                    }else {
                        console.log(false);
                    }
                } ).catch(function(error) {
                    if (error.response && error.response.status == 401) {
                        //console.log(error.response.data);
                        alert("Невірний логін або пароль!");

                    } else {
                        //console.log(error);
                        // Handle error however you want
                    }}

                );

            },
            // refresh(token, refreshLink){
            //     //alert('kkkdg');
            //     axios.request({
            //         method: 'POST',
            //         url: 'http://localhost:8080/fairy-trip/admin' + refreshLink,
            //         headers: {'Content-Type': "application/json", 'X-Requested-With': 'XMLHttpRequest', 'privatekey': token},
            //         data: {login: this.username, password: this.password}
            //     }).then((response) => {
            //         //console.log(response.data);
            //         // if(response.data) {
            //         const token = response.headers.privatekey;
            //         let expirationDate = new Date(response.headers.expirationdate);
            //         localStorage.setItem('token', token);
            //         let milliseconds = expirationDate.getTime();
            //         let currentmillis= new Date().getTime();
            //         console.log(token);
            //         console.log(expirationDate);
            //         this.$parent.refresh;
            //         //setTimeout(() => {this.refresh(token, refreshLink)}, ((milliseconds - currentmillis)/2));
            //         // }else {
            //         //     console.log(false);
            //         // }
            //     });
            //     //}
            //     //console.log(token);
            //     //console.log(Date());
            // }
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
        width: 75%;
        margin: auto;
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