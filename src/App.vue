<template>
  <v-app>
    <admin-log-in></admin-log-in>
  </v-app>
</template>

<script>
import AdminLogIn from './components/AdminLogIn'

export default {
  name: 'App',
  components: {
    AdminLogIn
  },
  data () {
    return {
      //
    }
  }
}
</script>
