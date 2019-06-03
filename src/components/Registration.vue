<template >
    <div>
        <header-template></header-template>
        <div class="form">
            <div class="image" @click="$refs.inputUpload.click()">
                <input v-show="false" ref="inputUpload" type="file" accept=".jpg, .jpeg, .png" @change="onFileChange" />
                <img width="200" height="200" v-if="url" :src="url" />
                <p style="text-align: center; margin-top: 80px; font-size: 16px" v-else>Завантажити фото</p>
            </div>
            <h1 style="text-align: center; margin-top: 20px; margin-bottom: 20px">Реєстрація</h1>
            <div style="text-align: center; font-style: italic; font-size: 18px">Зареєструйтеся на нашому сайті, щоб мати змогу робити замовлення.</div>
            <v-form
                    class="data"
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-text-field
                        v-model="lastname"
                        :counter="30"
                        :rules="lastnameRules"
                        label="Прізвище"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="name"
                        :counter="15"
                        :rules="nameRules"
                        label="Ім'я"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="surname"
                        :counter="15"
                        :rules="surnameRules"
                        label="По батькові"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="number"
                        :rules="numberRules"
                        label="Телефон"
                        type="number"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="date"
                        label="Дата народження"
                        type="date"
                        required
                ></v-text-field>
                <v-radio-group v-model="radioGroup" label="Стать:" class="sex" row>
                    <v-radio
                        v-for="n in 2"
                        :key="n"
                        :label="sex[n-1]"
                        :value="n"
                    ></v-radio>
                    </v-radio-group>
                <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        label="Do you agree?"
                        required
                ></v-checkbox>

                <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                >
                    Validate
                </v-btn>

                <v-btn
                        color="error"
                        @click="reset"
                >
                    Reset Form
                </v-btn>

                <v-btn
                        color="warning"
                        @click="resetValidation"
                >
                    Reset Validation
                </v-btn>
            </v-form>
        </div>
        <footer-template></footer-template>
    </div>

</template>

<script>
  import Header from "./Header"
  import Footer from "./Footer"
  export default {
    data: () => ({
      file: null,
      url: require('../images/nobody.jpg'),
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Введіть ваше ім\'я',
        v => (v && v.length <= 15) || 'Ім\'я повинно бути менше ніж 15 символів'
      ],
      lastname: '',
      lastnameRules: [
        v => !!v || 'Введіть ваше прізвище',
      ],
      surname: '',
      surnameRules: [
        v => !!v || 'Введіть ваше по батькові',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Введіть ваш E-mail',
        v => /.+@.+/.test(v) || 'Неправильний E-mail'
      ],
      number: '',
      numberRules: [
        v => !!v || 'Введіть ваш номер телефону',
      ],
      date: '',
      radioGroup: null,
      sex: ["Чоловіча", "Жіноча"],
      checkbox: false
    }),
    components: {
      'header-template': Header,
      'footer-template': Footer,
    },
    computed: {},
    mounted() {

    },
    methods: {
      onFileChange(e) {
        try {
          this.file = e.target.files[0];
          this.url = URL.createObjectURL(this.file);
        }catch (e) {
          //console.log("no")
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
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
    }
    .image:hover {
        box-shadow: 0px 0px 10px rgba(.8,.8,.8,.8);
    }
    .form {
        box-shadow: 0px 0px 4px rgba(.2,.2,.2,.2);
        height: 1000px;
        /*padding-right: 70px;*/
        margin-top: 10px;
        padding: 15px;
        padding-top: 5px;
        background-color: white;
        margin: 10px;
    }
    .data {
        margin: 0px;
        float: left;
        width: 100%;
    }
</style>