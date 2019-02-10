<template>
    <div class="auth">
        <v-card xs12 sm6 offset-sm3  height="500px">
            <v-container fill-height>
            <v-layout align-center>
                <div xs12 sm6 md3 class="auth_form">
                    <h1>Виконайте вхід у систему</h1>
                    <label>Логін</label>
                    <v-text-field
                            placeholder="Username"
                            solo
                            counter
                            prepend-icon="face"
                    ></v-text-field>
                    <label>Пароль</label>
                    <v-text-field
                            placeholder="Password"
                            solo
                            prepend-icon="lock"
                            v-model="password"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'password'"
                            counter
                            @click:append="show = !show"
                    ></v-text-field>
                    <div class="text-xs-center">
                        <v-btn color="success" large class="success">Увійти</v-btn>
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
                show: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 4 || 'Мінімум 4 символів'
                }
            }
        }
    }
</script>

<style scoped>

    @media only screen and (min-width: 600px) and (max-width: 1300px) {
        .auth {

        }
    }
    h1 {
        text-align: center;
        margin-bottom: 30px;
    }
    .auth {
        width: 70%;
        margin: auto;
    }
    .auth_form {
        margin: 0 auto;
        margin-top: 20px;
        width: 40%;

    }
    .success {
        margin-top: 20px;
    }
    label {
        font-size: 18px;
        margin-left: 35px;
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 600px) {
        .auth {
            margin-top: 0px;
            width: 100%;
        }
    }
</style>