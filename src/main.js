import Vue from 'vue';
import App from './App.vue';
import axios from "axios";
import VueRouter from "vue-router";
import {routes} from "./routes";
import './directives/Transform';


axios.defaults.baseURL = 'http://localhost:3000';

Vue.prototype.$http = axios;
//Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
