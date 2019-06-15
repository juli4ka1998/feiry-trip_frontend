<template >
    <div>
        <header-template></header-template>
        <div class="form">
            <div class="image" @click="$refs.inputUpload.click()">
                <input v-show="false" ref="inputUpload" type="file" accept=".jpg, .jpeg, .png" @change="onFileChange" />
                <img width="200" height="200" v-if="url" :src="url" />




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
                        v-model="user_data.lastname"
                        :counter="30"
                        :rules="lastnameRules"
                        label="Прізвище"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="user_data.name"
                        :counter="15"
                        :rules="nameRules"
                        label="Ім'я"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="user_data.surname"
                        :counter="15"
                        :rules="surnameRules"
                        label="По батькові"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="user_data.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="user_data.password"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :rules="passRules"
                        :type="show1 ? 'text' : 'password'"
                        label="Пароль"
                        counter
                        required
                        @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                        v-model="password_1"
                        :append-icon="show2 ? 'visibility' : 'visibility_off'"
                        :rules="passRules"
                        :type="show2 ? 'text' : 'password'"
                        label="Підтвердження паролю"
                        counter
                        required
                        @click:append="show2 = !show2"
                        confirmed:password
                ></v-text-field>
                <v-text-field
                        v-model="user_data.number"
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
                <v-radio-group v-model="radioGroup" label="Стать:" class="sex" row @change="changeSex">
                    <v-radio
                        v-for="n in 2"
                        :key="n"
                        :label="sex[n-1]"
                        :value="n"
                    ></v-radio>
                    </v-radio-group>
                <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'Необхідний дозвіл, щоб продовжити!']"
                        label="Дозвіл на опрацювання особистих даних"
                        required
                ></v-checkbox>

                <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                >
                    Зареєструватися
                </v-btn>

                <v-btn
                        color="error"
                        @click="reset"
                >
                    Очистити
                </v-btn>

            </v-form>
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
      file: null,
      url: require('../images/nobody.jpg'),
      valid: true,
      radioGroup: 1,
      date: null,
      sex: ["Чоловіча", "Жіноча"],
      user_data: {
        name: '',
        lastname: '',
        surname: '',
        email: '',
        number: '',
        birthdayDate: '',
        sex: 'Чоловіча',
        password: ''
        // registration_date: new Date()
      },
      nameRules: [
        v => !!v || 'Введіть ваше ім\'я',
        v => (v && v.length <= 15) || 'Ім\'я повинно бути менше ніж 15 символів'
      ],
      lastnameRules: [
        v => !!v || 'Введіть ваше прізвище',
      ],
      surnameRules: [
        v => !!v || 'Введіть ваше по батькові',
      ],
      emailRules: [
        v => !!v || 'Введіть ваш E-mail',
        v => /.+@.+/.test(v) || 'Неправильний E-mail'
      ],
      numberRules: [
        v => !!v || 'Введіть ваш номер телефону',
      ],
      checkbox: false,
        show1: false,
        show2: false,
        password_1: '',
        passRules: [
          v => (v && v.length >= 8) || 'Мінімум 8 символів'
        ]
    }),
    components: {
      'header-template': Header,
      'footer-template': Footer,
    },
    computed: {},
    mounted() {
      if(this.$store.state.photo) {
       let url = this.$store.getters.photo;
        var ImageURL = url;
        var block = ImageURL.split(";");
        var contentType = block[0].split(":")[1];// In this case "image/gif"
        var realData = block[1].split(",")[1];

        this.file = this.b64toBlob(realData, contentType);
        this.url = URL.createObjectURL(this.file);
      }
      else  this.url = require('../images/nobody.jpg');

    },
    methods: {
      changeSex(){
        this.user_data.sex = this.sex[this.radioGroup - 1];
        //console.log(new Date(this.date).toISOString());
      },
      onFileChange(e) {

        try {
          this.file = e.target.files[0];
          //console.log(this.file);\
          this.url = URL.createObjectURL(this.file);
          this.$store.dispatch('changePhoto',this.url);
          //this.url = URL.createObjectURL(this.$store.getters.photo);
          this.$router.replace('/fairytrip/cropp');
        }catch (e) {
          //console.log("no")
        }
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
          this.user_data.birthdayDate = new Date(this.date).toISOString();
          this.register();
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, {type: 'image/jpeg'});
        return blob;
  },
      register () {
        let file = this.file;
        let data = this.user_data;
        //console.log(data);
        axios.request({
            method: 'POST',
            url: "http://localhost:8080/fairy-trip/user/create_user",
            headers: {'Content-Type': "multipart/form-data"},
            transformRequest: function () {
              let formData = new FormData();
              formData.append("json", JSON.stringify(data));
              formData.append("file", file, data.email + '.jpg');
              return formData;
            }
        }).then(() => {
          this.$router.replace('/fairytrip/');
          localStorage.setItem('login', data.email);
        } ).catch(function(error) {
          if (error.response && error.response.status == 409) {
            alert("Користувач з даним e-mail уже існує!");
          }}
        );
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