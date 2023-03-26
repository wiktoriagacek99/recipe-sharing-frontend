import Store from "../store";
import axios from "../utils/axios";

class Auth {
  async login(email, password) {
    try {
      const response = await axios.post("login", {
        email: email,
        password: password,
      });
      Store.commit("SET_STATE_TOKEN", { token: response.data.token, user: response.data.user });
      if (Store.state.cookies_accepted)
        Store.commit("SET_COOKIE_TOKEN", { token: response.data.token, user: response.data.user });
      return true;
    } catch (error) {
      return false;
    }
  }

  async register(name, email, password, password_confirmation) {
    try {
      const response = await axios.post("register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      });
      Store.commit("SET_STATE_TOKEN", { token: response.data.token, user: response.data.user });
      if (Store.state.cookies_accepted)
        Store.commit("SET_COOKIE_TOKEN", { token: response.data.token, user: response.data.user });
      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    Store.commit("REMOVE_COOKIE_TOKEN");
    Store.commit("REMOVE_STATE_TOKEN");
  }

  get isLogged() {
    return !!Store.state.token;
  }
}

export default {
  install(Vue) {
    Vue.prototype.$auth = new Auth();
  },
};
