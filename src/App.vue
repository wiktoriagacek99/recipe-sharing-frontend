<template>
  <div id="app">
    <PageLayout />
  </div>
</template>

<script>
import PageLayout from "./components/PageLayout";

export default {
  name: "Home",

  components: {
    PageLayout,
  },

  created() {
    this.$store.commit("SET_STATE_TOKEN", { token: this.$cookies.get("_token"), user: this.$cookies.get("_user") });
    if (this.$cookies.get("_cookies_accepted") === true) this.$store.commit("SET_STATE_COOKIES_ACCEPTED");
  },
};
</script>

<style lang="scss">
@import "assets/css/properties.scss";

body {
  background-color: #f4f8fb;
  overflow-x: hidden;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #757575;
  font-family: Verdana;
}
a {
  text-decoration: none !important;
}
</style>
