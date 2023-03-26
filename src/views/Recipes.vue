<template>
  <div class="recipes">
    <div class="list-item" v-for="recipe in recipes" v-bind:key="recipe.id" data-aos="zoom-in" data-aos-offset="200px">
      <div class="row">
        <div
          class="col-md-3 thumb"
          v-bind:style="
            recipe.main_image
              ? {
                  'background-image': 'url(' + recipe.main_image.url + ')',
                }
              : {}
          "
        >
          <a class="author" href="#" title="Nazwa użytkownika, który dodał post">
            <img :src="recipe.user.avatar ? recipe.user.avatar.url : no_img" alt="avatar" />
          </a>
        </div>
        <div class="col-md-8 txt">
          <h3 class="title">{{ recipe.title }}</h3>
          <p class="published">
            Opublikowano: <strong>{{ recipe.created_at }}</strong>
          </p>
          <p class="description">{{ recipe.description }}</p>
          <p class="category p-0 col-6">
            <a v-for="(category, index) in recipe.categories" v-bind:key="index" href="#"> #{{ category.name }} </a>
          </p>

          <p>
            <router-link :to="'recipe/' + recipe.slug"><v-button>Pokaż więcej</v-button></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import no_img from "@/assets/images/profile_pic.jpg";
import no_image from "../assets/images/no_image.jpg";

import axios from "../utils/axios";

import AOS from "aos";
import "aos/dist/aos.css";
Vue.use(AOS);

import Button from "../components/Button";
import Vue from "vue";

export default {
  name: "Recipes",
  props: {
    msg: String,
  },
  created() {
    AOS.init();
  },
  components: {
    "v-button": Button,
  },
  data() {
    return {
      no_img: no_img,
      no_image: no_image,
      pageIndex: 1,
      totalPages: null,
      loading: false,
      recipes: [
        {
          title: "",
          slug: "",
          description: "",
          created_at: null,
        },
      ],
    };
  },
  mounted() {
    this.getRecipes();
    this.scroll();
  },
  methods: {
    getRecipes: function (pageIndex = 1) {
      this.loading = true;
      axios.get("/recipes?page=" + pageIndex).then((response) => {
        if (pageIndex === 1) this.recipes = response.data.data;
        else this.recipes = this.recipes.concat(response.data.data);
        this.pageIndex = response.data.meta.current_page;
        this.totalPages = response.data.meta.last_page;
        this.loading = false;
      });
    },
    scroll: function () {
      window.onscroll = () => {
        if (!this.loading) {
          if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight)
            if (this.totalPages !== null && this.pageIndex < this.totalPages) this.getRecipes(this.pageIndex + 1);
        }
      };
    },
  },
};
</script>

<style scoped lang="scss">
.recipes {
  margin-bottom: -24px;
  .category {
    font-size: 12px;
    color: #888;
    margin: 0;
    position: absolute;
    bottom: 0;
  }
  .list-item {
    background-color: white;
    text-align: left;
    margin-bottom: 17px;
    box-shadow: var(--std-shadow);
    padding: 17px 32px;
  }

  .thumb {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url("../assets/images/no_image.jpg");
    border-radius: 0.25rem;
    margin: 15px;
    width: 100%;
    height: 13rem;

    .author img {
      width: 65px;
      position: absolute;
      height: 65px;
      border-radius: 50%;
      object-fit: cover;
      top: 0;
      left: 0;
      cursor: pointer;
      transform: translate(-25%, -25%);
    }
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin-bottom: 2px;
  }

  .published {
    font-size: 12px;
    color: #888;
    margin: 0.5rem 0 1rem 0;
  }

  .description {
    font-size: 15px;
    color: #444;
    margin-bottom: 24px;
    line-height: 1.3;
  }

  .txt {
    margin: 15px 15px 15px 0;
    position: relative;
  }
  .txt p:last-child {
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

@media screen and (max-width: 992px) {
  .description {
    padding-bottom: 50px;
  }
}
</style>
