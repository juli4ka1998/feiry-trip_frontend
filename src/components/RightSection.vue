<template>
    <div class="right_section" id="fix_section">
        <v-flex xs12>
            <v-card color="white" class="black--text" height="150px" @click="login">
                <v-layout row>
                    <v-flex xs7>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{ name }}</div>
                                <div>{{ orders }}</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs5 >
                        <v-img style="margin-right: 10px"
                               :src="src"
                               height="125px"
                               contain
                        ></v-img>
                    </v-flex>
                </v-layout>
                <!--<v-divider light></v-divider>-->
                <!--<v-card-actions class="pa-3">-->

                <!--</v-card-actions>-->
            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-card color="white" class="black--text" height="415px" style="margin-top: 10px; ">
                <v-layout column>
                    <v-flex xs6>
                        <v-card-title primary-title>
                            <div style="text-align: center; width: 100%; font-size: 16px">Останні переглянуті товари:</div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs7>
                        <v-img style="margin-right: 10px"
                               :src="url_1"
                               height="125px"
                               contain
                        ></v-img>
                    </v-flex>
                    <v-flex xs7>
                        <v-img style="margin-right: 10px; margin-top: 10px; "
                               :src="url_2"
                               height="125px"
                               contain
                        ></v-img>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
	import axios from 'axios'
	export default {
        data: () => ({
            name: 'Власний кабінет',
            orders: 'Увійдіть, щоб зробити замовлення.',
            src: require('../images/nobody.jpg'),
            url_1: '',
            url_2: '',

        }),
        mounted() {
          let comm_1 = localStorage.getItem('comm-1');
          let comm_2 = localStorage.getItem('comm-2');
          if(comm_1 && comm_2) {
            this.url_1 = "http://localhost:8080" + JSON.parse(comm_1).imagePath;
            this.url_2 = "http://localhost:8080" + JSON.parse(comm_2).imagePath;
          }
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
              //console.log(response.data);
              this.name = response.data.name + ' ' + response.data.lastname;
              this.orders = 'Мої замовлення';
              this.src = "http://localhost:8080" + response.data.photoPath;
            });
          }
        },
        methods: {
            login (){
                let login = localStorage.getItem('login');
                if(login != null) {
                    this.$router.push('/fairytrip/user')
                }
                else {
                    this.$router.push('/fairytrip/login');
                }
            }
        }
    }
</script>

<style scoped>
    .right_section{
        width: 18.9%;
        margin-top: 10px;
        float: right;
    }
</style>