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
                        <v-btn color="success" large>Увійти</v-btn>
                    </div>

                </div>
            </v-layout>
            </v-container>
        </v-card>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                currentHeight: '',
                show: false,
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
        },

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