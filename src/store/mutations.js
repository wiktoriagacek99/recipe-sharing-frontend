import Vue from "vue";

export const SET_STATE_TOKEN = (state, data) => {
  state.token = data.token;
  state.user = data.user;
};

export const REMOVE_STATE_TOKEN = (state) => {
  state.token = null;
  state.user = {};
};

export const SET_COOKIE_TOKEN = (state, data) => {
  Vue.$cookies.set("_token", data.token);
  Vue.$cookies.set("_user", data.user);
};

export const REMOVE_COOKIE_TOKEN = () => {
  Vue.$cookies.remove("_token");
  Vue.$cookies.remove("_user");
};

export const SET_STATE_USER = (state, user) => {
  state.user = user;
};

export const SET_STATE_COOKIES_ACCEPTED = (state) => {
  state.cookies_accepted = true;
};

export const SET_COOKIE_COOKIES_ACCEPTED = () => {
  Vue.$cookies.set("_cookies_accepted", true);
};
