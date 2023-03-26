<template>
  <div class="container">
    <div class="row">
      <div class="col-3 logo p-0" id="logo">
        <router-link title="Strona główna" to="/">
          <span>LOGO</span>
        </router-link>
      </div>

      <div class="col-6"></div>

      <div class="col-3 users" v-if="isLogged()">
        <router-link to="/create-recipe" v-if="isLogged()">
          <span><i class="fas fa-plus" title="Dodaj nowy przepis"></i></span>
        </router-link>
        <ul id="features" class="features" v-show="opened">
          <li><router-link :to="'/profile/' + this.$store.state.user.name">Mój profil</router-link></li>
          <li><router-link :to="'/edit-profile/' + this.$store.state.user.name">Ustawienia profilu</router-link></li>
          <li><a @click="logout()">Wyloguj się</a></li>
        </ul>
        <span v-click-outside="hide" @click="toggle">
          <span><i class="fas fa-user"></i></span>
        </span>
      </div>
      <div class="col-3 users" v-else>
        <router-link class="login" to="/login"><i class="fas fa-user-plus"></i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      featuresOpen: false,
      opened: false,
      show: false,
    };
  },

  methods: {
    isLogged: function () {
      return this.$auth.isLogged;
    },
    logout: function () {
      this.$auth.logout();
    },
    toggle() {
      this.opened = true;
    },
    hide() {
      this.opened = false;
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss">
.container {
  text-align: right;

  .logo {
    position: relative;
    text-align: left;
    font-size: 20px;
    height: 100%;
    letter-spacing: 10px;

    .bg {
      position: absolute;
      height: 300%;
      top: 0;
      left: 0;
      width: 100%;
    }
  }

  .users {
    padding: 0;

    i {
      font-size: 1.5rem;
      margin-left: 20px;
    }

    .features {
      position: absolute;
      right: 0;
      background-color: white;
      box-shadow: var(--std-shadow);
      padding: 10px;
      text-align: left;
      list-style-type: none;
      margin: 0;
      display: block;

      li {
        margin-bottom: 10px;
        font-size: 1rem;
        color: black;
      }
    }
  }
}
</style>
