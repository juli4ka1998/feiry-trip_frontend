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
      info: "info"//null
    }
  },
  mounted() {
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
