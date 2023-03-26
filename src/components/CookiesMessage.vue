<template>
  <div id="cookies-message-container" v-show="!$store.state.cookies_accepted">
    <div id="cookies-message">
      Ta strona używa ciasteczek (cookies).<a @click="acceptCookies()" id="accept-cookies-checkbox">Rozumiem</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    acceptCookies() {
      this.$store.commit("SET_STATE_COOKIES_ACCEPTED");
      this.$store.commit("SET_COOKIE_COOKIES_ACCEPTED");
    },
  },
};
</script>

<style lang="scss" scoped>
#cookies-message {
  color: white;
  padding: 8px 10px;
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
#accept-cookies-checkbox {
  color: white;
  border: solid 1px var(--color-blue);
  transition: all 0.5s;
  padding: 2px 12px;
  border-radius: 4px;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  background-color: var(--color-blue);
  &:hover {
    background-color: transparent;
    border-color: white;
  }
}
</style>
