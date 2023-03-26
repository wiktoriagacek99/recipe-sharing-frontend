<template>
  <div class="login">
    <h1>Zaloguj się</h1>
    <Input v-model="formData.email" tag="input" type="text" name="email" id="email" label="E-mail"> </Input>
    <Input v-model="formData.password" tag="input" type="password" name="password" id="password" label="Hasło"> </Input>
    <div class="row input">
      <div class="col-12">
        <a href="#" class="login__forgot-pass mb-5">Nie pamiętam hasła</a>
      </div>
    </div>
    <Button @click="login()">ZALOGUJ</Button>
    <div class="info">
      <label>Nie posiadasz jeszcze konta? &nbsp;&nbsp;</label>
      <router-link to="/register" class="register">Zarejestruj się</router-link>
    </div>
  </div>
</template>

<script>
import Input from "../components/CreateRecipe/Input";
import Button from "../components/Button";

export default {
  name: "Login",
  components: { Input, Button },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login: async function () {
      this.loader = true;
      if (await this.$auth.login(this.formData.email, this.formData.password)) this.$router.replace({ name: "Home" });
      else this.error = true;
      this.loader = false;
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  margin-bottom: 35px;
}
.login {
  margin: 0 auto;
  padding: 10%;
  box-shadow: var(--std-shadow);
  background-color: white;
  height: 89vh;
  width: 50%;
  h1 {
    text-align: left;
    margin-bottom: 50px;
  }

  &__box .form-control:focus {
    border: 1px solid black !important;
    outline: none !important;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5) !important;
  }

  &__forgot-pass {
    color: var(--color-blue);
  }

  &__forgot-pass:hover {
    color: #000;
  }

  .reminder {
    text-align: left;
    label {
      display: inline-flex;
      cursor: pointer;
      position: relative;
      align-items: center;
      justify-content: center;
      color: var(--form-color);
      font-size: 15px;
      text-transform: uppercase;
      margin: 0;
      & > span {
        color: black;
        padding: 0.5rem 0.25rem;
      }
      & > input {
        height: 25px;
        width: 25px;
        appearance: none;
        border: 2px solid var(--form-color);
        outline: none;
        cursor: pointer;
        &:checked {
          border: 2px solid var(--form-color);
          background-color: transparent;
          background-image: url("../assets/images/check_x.png");
          background-size: cover;
          background-position: center;
          & + span::before {
            display: block;
            text-align: center;
            position: absolute;
            left: 0.7rem;
            top: 0.2rem;
          }
        }
        &:hover {
          border: 2px solid var(--form-color);
          background-color: #f0f0f0;
          transition-duration: 0.3s;
        }
      }
    }
  }

  .info {
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 1.2rem;
    margin: 0 auto;
    left: 0;
    bottom: 40px;

    .login {
      color: var(--color-blue);
    }
  }
}
</style>
