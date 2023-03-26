<template>
  <div class="edit-account">
    <div class="row m-0 w-100">
      <h3>Podstawowe informacje</h3>
      <div class="col-lg-4 col-md-12">
        <MainImage v-model="formData.avatar" class="p-0 mb-3 p-0"></MainImage>
      </div>
      <div class="col-lg-8 col-md-12 p-0 name_container">
        <div class="row w-100 m-0">
          <div class="col-12 p-0">
            <Input v-model="formData.first_name" tag="input" name="first_name" id="first_name" label="Imię"> </Input>
          </div>
          <div class="col-12 p-0">
            <Input v-model="formData.last_name" tag="input" name="last_name" id="last_name" label="Nazwisko"> </Input>
          </div>
        </div>
      </div>
      <div class="row w-100 m-0 my-5">
        <Input v-model="formData.description" tag="textarea" name="description" id="description" label="Opis"> </Input>
      </div>

      <h3>E-mail i hasło</h3>

      <div class="row w-100 m-0">
        <Button
          class="col-lg-4 col-sm-12 mb-5 button-edit"
          @click="toggleUsername"
          aria-controls="features"
          :aria-expanded="usernameOpen ? 'true' : 'false'"
        >
          {{ usernameOpen ? "▲   Anuluj" : "▼   Zmiana nazwy" }}
        </Button>
        <Button
          class="col-lg-4 col-sm-12 mb-5 button-edit"
          @click="toggleEmail"
          aria-controls="features"
          :aria-expanded="emailOpen ? 'true' : 'false'"
        >
          {{ emailOpen ? "▲   Anuluj" : "▼   Zmiana e-mail" }}
        </Button>
        <Button
          class="col-lg-4 col-sm-12 mb-5 button-edit"
          @click="togglePassword"
          aria-controls="features"
          :aria-expanded="passwordOpen ? 'true' : 'false'"
        >
          {{ passwordOpen ? "▲   Anuluj" : "▼   Zmiana hasła" }}
        </Button>
      </div>
      <div class="row w-100 m-0">
        <div class="col-lg-4 col-sm-12 mb-5" v-show-slide="usernameOpen">
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Podaj hasło"> </Input>
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Nowy nick"> </Input>
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Potwierdź nick"> </Input>
        </div>
        <div class="col-lg-4 col-sm-12 mb-5" v-show-slide="emailOpen">
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Podaj hasło"> </Input>
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Nowy e-mail"> </Input>
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Potwierdź e-mail"> </Input>
        </div>
        <div class="col-lg-4 col-sm-12 mb-5" v-show-slide="passwordOpen">
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Stare hasło"> </Input>
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Nowe hasło"> </Input>
          <Input v-model="formData.x" tag="input" name="x" id="x" label="Potwierdź hasło"> </Input>
        </div>
      </div>

      <h3>Social media</h3>
      <div class="row w-100 m-0 mb-5">
        <Input v-model="formData.facebook_url" tag="input" name="facebook_url" id="facebook_url" label="Facebook">
        </Input>
        <Input v-model="formData.instagram_url" tag="input" name="instagram_url" id="instagram_url" label="Instagram">
        </Input>
        <Input v-model="formData.twitter_url" tag="input" name="twitter_url" id="twitter_url" label="Twitter"> </Input>
        <Input v-model="formData.youtube_url" tag="input" name="youtube_url" id="youtube_url" label="YouTube"> </Input>
      </div>
    </div>

    <Button @click="submitForm">Zapisz zmiany</Button>
  </div>
</template>
<script>
import Button from "../components/Button";
import Input from "../components/CreateRecipe/Input";
import MainImage from "../components/CreateRecipe/MainImage";
import { serialize } from "object-to-formdata";
import axios from "../utils/axios";

export default {
  name: "EditProfile",
  components: { Button, Input, MainImage },
  data() {
    return {
      formData: {
        name: null,
        first_name: null,
        last_name: null,
        avatar: null,
        description: null,
        old_password: null,
        new_password: null,
        confirm_password: null,
        email: null,
        facebook_url: null,
        instagram_url: null,
        twitter_url: null,
        youtube_url: null,
      },
      usernameOpen: false,
      emailOpen: false,
      passwordOpen: false,
    };
  },
  methods: {
    toggleUsername() {
      this.usernameOpen = !this.usernameOpen;
    },
    toggleEmail() {
      this.emailOpen = !this.emailOpen;
    },
    togglePassword() {
      this.passwordOpen = !this.passwordOpen;
    },
    submitForm: async function () {
      try {
        const formData = serialize(this.formData, {
          indices: true,
          allowEmptyArrays: true,
        });

        await axios.post("users/" + this.$store.state.user.name + "?_method=PUT", formData, {
          headers: {
            Authorization: `Bearer ` + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        });
        this.$router.replace({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.edit-account {
  text-align: left;
  margin: 0 auto;
  padding: 8%;
  box-shadow: var(--std-shadow);
  background-color: white;
  min-height: 89vh;

  .description {
    text-align: justify;
    line-height: 20px;
    font-size: 14px;

    textarea {
      height: 250px;
      color: #111;
      outline: none;
      border: 1px solid var(--form-color);
      padding: 0 5px;
      border-radius: 2px;
      position: relative;
      width: 100%;
      resize: none;
    }
  }

  .edit {
    position: absolute;
    right: 0;
    margin: 0 15px;
    color: orange;
    font-size: 1.3rem;
  }

  h3 {
    margin: 30px 0 40px 0;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    word-spacing: 2px;
  }

  .name_container {
    display: flex;
    align-items: center;
    justify-content: right;
    @media screen and (max-width: 992px) {
      margin-top: 5rem;
    }
  }

  .main-photo {
    max-height: 200px;
    height: 200px;
    position: relative;
  }

  .preview-container {
    width: 200px !important;
    border-radius: 50% !important;
    margin: 0 !important;
    max-width: 100% !important;
    height: 200px !important;
    border: 2px dashed var(--form-color);
  }

  .picture-preview {
    height: 200px !important;
    background-color: white !important;
  }

  .picture-input button {
    display: none !important;
  }
  .picture-inner {
    top: -200px !important;
    border: none !important;

    span {
      color: var(--form-color);
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .swiper-slide,
  .vue-lightbox-content {
    max-width: 100% !important;
  }

  .modal-mask {
    z-index: 10002 !important;
  }

  .edit {
    background-color: #0a66c2;
    width: 50px;
    height: 50px;
    display: inline-block;
    color: white;
    position: absolute;
    right: 50px;
    bottom: 0;
    border-radius: 50%;
    z-index: 10002;

    i,
    i::before {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 1.3rem;
    }

    .btn {
      display: none !important;
    }
  }

  .name_container .text-input {
    margin: 15px 0;
  }

  .button-edit {
    max-width: 31.333%;
    margin: 0 1%;
  }

  @media screen and (max-width: 992px) {
    .preview-container {
      width: 250px !important;
      height: 250px !important;
      margin: 0 auto !important;
    }

    .button-edit {
      max-width: 100%;
      margin: 0 0 3rem 0 !important;
    }
  }
}
</style>
