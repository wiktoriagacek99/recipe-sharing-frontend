<template>
  <div class="account">
    <div class="box">
      <div class="row">
        <div class="col-lg-5 col-md-12">
          <div class="profile-pic" v-bind:style="{ 'background-image': 'url(' + no_img + ')' }"></div>
        </div>

        <div class="col-lg-7 col-md-12">
          <div class="informations">
            <h3 class="username">{{ user.name }}</h3>
          </div>
          <router-link :to="'/edit-profile/' + this.$store.state.user.name" class="edit-profile" type="submit"
            ><i class="fas fa-edit"></i
          ></router-link>
          <Ratings></Ratings>
          <div class="description">
            <!-- ograniczenie: 500 znakow -->
            Lorem ipsum dolor sit amet cursus non, tristique magna. Mauris metus. Etiam sapien quis dolor. Donec
            accumsan lorem. Sed hendrerit tellus ante ipsum lorem libero, pharetra varius. Morbi et odio. Donec
            condimentum interdum sem nec ultrices posuere a, imperdiet faucibus, nulla in wisi. Integer auctor neque
            tortor venenatis nisl. Nunc ut mattis id, ullamcorper mauris. Aliquam eros. Donec enim eget volutpat lacinia
            quam. Nulla a pellentesque dolor. Morbi bibendum. Nulla eget dolor rhoncus aliquam...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import no_img from "@/assets/images/profile_pic.jpg";
import axios from "../utils/axios";
import Ratings from "../components/Ratings";

export default {
  data: function () {
    return {
      no_img: no_img,
      user: {},
    };
  },
  components: {
    Ratings,
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser: function () {
      axios.get("users/" + this.$route.params.name).then((response) => (this.user = response.data.user));
    },
  },
};
</script>

<style lang="scss">
.account {
  margin-bottom: -34px;

  .box {
    background-color: white;
    padding: 1.5rem 2rem;
    text-align: left;
    box-shadow: var(--std-shadow);
    margin-bottom: 30px;

    .profile-pic {
      width: 250px;
      height: 250px;
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      margin: 0 auto;
    }

    .social-media {
      margin: 15px auto;
      width: 100%;
      text-align: left;
      bottom: 0 !important;
      position: absolute;

      .button a i {
        font-size: 35px;
        display: inline-flex;
        height: 100%;
        position: relative;
        bottom: 3px;
        margin-right: 15px;
        color: orange;
        text-decoration: none;
      }
    }

    .edit-profile .fa-edit {
      position: absolute;
      right: 0;
      margin: 0 15px;
      color: orange;
      font-size: 1.3rem;
    }

    .username {
      font-size: 18px;
      font-weight: 700;
      color: #000;
    }

    .posts {
      .link {
        height: 100%;
        justify-content: center;
        display: flex;

        img {
          width: 100%;
          object-fit: cover;
          margin-bottom: 30px;
        }
      }
    }

    .additives {
      margin: 15px auto;
      width: 70%;
      text-align: left;

      .black-label {
        width: 100%;
        margin: 5px 0;
        padding: 5px;
      }

      i {
        color: orange;
        font-size: 1.3rem;
      }

      label {
        margin: 0 0 10px 10px;
      }
    }

    .description {
      margin-top: 50px;
      text-align: justify;
      line-height: 20px;
      font-size: 14px;
    }
  }

  @media screen and (max-width: 992px) {
    .social-media {
      position: fixed !important;
      top: 30%;
      left: 0;
      width: auto !important;

      .button {
        display: grid;

        i {
          margin: 3px 0;
        }
      }
    }
  }
}
</style>
