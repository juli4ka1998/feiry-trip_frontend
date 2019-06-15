import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'
import {routes} from './routes'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import { store } from './store/store'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'
import VueJquery from 'vue-jquery'

Vue.use(VueJquery);
Vue.use(VueCroppie);
Vue.use(VueRouter);
Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.lighten1, // #E53935
    secondary: colors.cyan.lighten1, // #FFCDD2
    accent: colors.cyan.lighten1 // #3F51B5
  }
});
const router = new VueRouter({
  routes,
  mode: 'history'
});
router.beforeEach((to, from, next) => {
  if(to.path == '/fairytrip/admin_home'){
    if(localStorage.getItem('login') == 'admin6'){
      next();
    }
    else
      return false;
  }
  next();
});
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
