import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Auth from "./plugins/auth";
import VueCookies from "vue-cookies";
import Vuelidate from "vuelidate";
import VShowSlide from "v-show-slide";
import StarRating from "vue-star-rating";

Vue.config.productionTip = false;

Vue.use(Auth);
Vue.use(VueCookies);
Vue.use(Vuelidate);
Vue.use(VShowSlide);
Vue.use(StarRating);

Vue.$cookies.config("7d");

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
