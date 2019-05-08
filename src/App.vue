<template>
  <v-app>
    <router-view></router-view>
    <!--<div>{{ info }}</div>-->
  </v-app>

</template>

<script>
//import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      admin_username: null
    }
  },
  methods: {
    // refresh(token){
    //   //alert(this.username);
    //   //alert('klhlf');
    //   axios.request({
    //     method: 'POST',
    //     url: 'http://localhost:8080/fairy-trip/admin/refresh_token' ,
    //     headers: {'Content-Type': "application/json", 'X-Requested-With': 'XMLHttpRequest', 'privatekey': token},
    //     data: {login: this.username, password: this.password}
    //   }).then((response) => {
    //     //console.log(response.data);
    //     // if(response.data) {
    //     const token = response.headers.privatekey;
    //     let expirationDate = new Date(response.headers.expirationdate);
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('expirationDate', expirationDate);
    //     let milliseconds = expirationDate.getTime();
    //     let currentmillis= new Date().getTime();
    //     console.log(token);
    //     console.log(expirationDate);
    //
    //     setTimeout(() => {this.refresh(token)}, 3000);
    //     // }else {
    //     //     console.log(false);
    //     // }
    //   });
      //}
      //console.log(token);
      //console.log(Date());
    //}
  },
  mounted() {
    // if(localStorage.getItem('token') != null) {
    //   const token = localStorage.getItem('token');
    //   let expirationDate = new Date(localStorage.getItem('expirationDate'));
    //   let milliseconds = expirationDate.getTime();
    //   let currentmillis = new Date().getTime();
    //   setTimeout(() => {
    //     this.refresh(token)
    //   }, ((milliseconds - currentmillis) - 3000));
    // }
//     axios({
//       url: 'http://localhost:8080/commodity/shoes/11',
//       method: 'delete',
//       data:  {
//
//       }
//     // }).then((response)=> {
//     //   console.log(response);
//     // });
//   }).then((response)=> (this.info = response.data));
// //console.log(this.info);

  }
}
</script>
