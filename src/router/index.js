import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",

    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",

    component: () => import("../views/Register.vue"),
  },

  {
    path: "/profile/:name",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/edit-profile/:name",
    name: "EditProfile",

    component: () => import("../views/EditProfile.vue"),
  },
  {
    path: "/create-recipe",
    name: "CreateRecipe",

    component: () => import("../views/CreateRecipe.vue"),
  },
  {
    path: "/recipe/:slug",
    name: "View",
    component: () => import("../views/View.vue"),
  },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
