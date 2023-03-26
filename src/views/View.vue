<template>
  <div class="recipe container">
    <div
      v-if="recipe.main_image"
      class="background-image"
      v-bind:style="{
        'background-image':
          ' linear-gradient(rgba(16,16,16,0.5),  rgba(16,16,16,0.5)) , url(' + recipe.main_image.url + ')',
      }"
    >
      <h2 class="title">{{ recipe.title }}</h2>
      <p class="user">Dodane przez: {{ recipe.user.name }}</p>
      <star-rating
        :rating="3.8"
        :read-only="true"
        :increment="0.01"
        :star-size="30"
        active-color="var(--color-blue)"
        :show-rating="false"
      ></star-rating>
    </div>
    <div v-else class="background-image">
      <h2 class="title">{{ recipe.title }}</h2>
      <p class="user">Dodane przez: {{ recipe.user.name }}</p>
    </div>
    <div class="properties">
      <div class="wrap">
        <div class="row">
          <div class="col-4 prop">
            <p><i class="fas fa-crown"></i></p>
            <p>TRUDNOŚĆ</p>
            <p>{{ recipe.difficulty }}</p>
          </div>
          <div class="col-4 prop">
            <p><i class="fas fa-clock"></i></p>
            <p>CZAS</p>
            <p>{{ recipe.preparation_time }}h</p>
          </div>
          <div class="col-4 prop">
            <p><i class="fas fa-user-friends"></i></p>
            <p>PORCJE</p>
            <p>{{ recipe.servings }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="wrap">
        <div class="categories">
          <a v-for="(category, index) in recipe.categories" v-bind:key="index" class="black-label" href="#"
            >#{{ category.name }}</a
          >
        </div>
        <p class="desc">
          {{ recipe.content }}
        </p>
        <i>Opublikowano: {{ recipe.created_at }}</i>
        <div v-if="recipe.nutrients" class="nutrients">
          <hr />

          <h5>Wartości odżywcze w porcji</h5>
          <div class="row center">
            <div class="col-2 label">
              <strong class="bold">KCAL</strong>
              <p class="mod">{{ recipe.nutrients.calories }}</p>
            </div>
            <div class="col-2 label">
              <strong class="bold">białko</strong>
              <p class="mod">{{ recipe.nutrients.protein }}</p>
            </div>
            <div class="col-2 label">
              <strong class="bold">tłuszcz</strong>
              <p class="mod">{{ recipe.nutrients.fat }}</p>
            </div>
            <div class="col-2 label">
              <strong class="bold">wędlowodany</strong>
              <p class="mod">{{ recipe.nutrients.carbs }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <div class="details row m-0">
      <div class="ingredients col-6">
        <h3 class="title">SKŁADNIKI</h3>
        <div class="check" v-for="(ingredient, index) in recipe.ingredients" v-bind:key="index">
          <label>
            <input class="check" type="checkbox" />
            <span>{{ ingredient.name }}</span>
          </label>
        </div>
      </div>
      <div class="steps col-6">
        <h3 class="title">PRZYGOTOWANIE</h3>
        <div class="row" v-for="(step, index) in recipe.steps" v-bind:key="index">
          <div class="col-1 index">
            <label class="black-label">{{ index + 1 }}</label>
          </div>
          <div class="col-11">
            <label>{{ step.content }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="additives">
      <div class="gallery">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div
              v-for="(image, index) in recipe.images"
              :key="index"
              class="carousel-item"
              :class="index === 0 ? 'active' : ''"
            >
              <img class="d-block w-100" :src="image.url" alt="Pierwszy slajd" />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <hr />
      <h5>Czytaj opinie</h5>
      <div class="comments">
        <div id="features" v-show-slide="featuresOpen" class="features">
          <Comments></Comments>
        </div>
        <Button
          @click="toggleFeatures"
          class="toggle-features"
          aria-controls="features"
          :aria-expanded="featuresOpen ? 'true' : 'false'"
        >
          {{ featuresOpen ? "▲   Ukryj komentarze" : "▼   Zobacz komentarze" }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";

import Button from "../components/Button";
import Comments from "../components/Comments";
import StarRating from "vue-star-rating";

export default {
  data: function () {
    return {
      recipe: {
        nutrients: {},
      },
      comments: true,
      featuresOpen: false,
    };
  },
  components: {
    Comments,
    Button,
    StarRating,
  },
  mounted() {
    this.getRecipe();
  },
  methods: {
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen;
    },
    getRecipe: function () {
      axios.get("recipes/" + this.$route.params.slug).then((response) => (this.recipe = response.data.data));
    },
  },
};
</script>

<style scoped lang="scss">
.recipe {
  text-align: center;

  .background-image {
    height: 64vh;
    display: table;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
    background-image: url("../assets/images/no_image.jpg");
    color: white;
    position: relative;

    .title {
      text-align: center;
      display: table-cell;
      vertical-align: middle;
      font-size: 45px;
      font-weight: 700;
      padding: 0 30px;
    }

    .user {
      display: table-footer-group;
      text-align: center;
    }
  }

  .vue-star-rating {
    position: absolute;
    bottom: 15px;
    right: 0;
    left: 0;
    justify-content: center;
  }

  .properties {
    height: 25vh;
    width: 100%;
    background-color: #1f1d1d;
    color: white;
    padding: 0.5rem;
    box-shadow: var(--std-shadow);
    display: flex;
    align-items: center;
    justify-content: center;

    .wrap {
      padding: 30px 50px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .wrap .row {
      width: 75%;
      margin: 0 auto;
    }

    .prop:not(.prop:last-child) {
      border-right: 1px solid white;
    }

    .prop i {
      font-size: 35px;
    }
  }

  .main {
    .wrap {
      display: block;
      padding: 30px;

      .black-label {
        padding: 10px;
      }

      .desc {
        margin: 30px 0 15px 0;
      }

      .nutrients {
        margin: 0 auto;
        padding: 15px 0;

        .center {
          justify-content: center;
        }
      }

      .label {
        background-color: white;
        box-shadow: var(--std-shadow);
        border-radius: 5px;
        margin: 7px;
        padding: 10px 0;
        max-width: 20%;
        text-align: center;

        .mod {
          margin: 0;
          margin-top: 5px;
        }

        .bold {
          margin: 0;
          margin-top: 5px;
          font-weight: bolder;
          font-size: 10px;
          padding: 10px 5px;
          text-transform: uppercase;
        }
      }
    }
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;

    .ingredients {
      height: auto;
      max-width: 35%;
      flex: 0 0 35%;
      margin-right: 2%;
      padding: 15px;
      background-color: white;
      box-shadow: var(--std-shadow);
      text-align: left;

      .title {
        padding: 20px;
        margin: 0;
        text-align: left;
        padding-top: 1rem;
        text-transform: uppercase;
      }
    }
  }

  .steps {
    height: auto;
    max-width: 63%;
    flex: 0 0 63%;
    padding: 15px;
    background-color: white;
    box-shadow: var(--std-shadow);
    text-align: left;

    .row {
      padding: 5px 0;

      .index {
        display: flex;
        justify-content: center;
        padding: 0;
      }

      .black-label {
        text-align: center;
        background-color: var(--color-blue);
        border-radius: 30px;
        color: white !important;
        font-size: 1.2rem;
        cursor: default;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 8px;
      }
    }
    .title {
      padding: 20px;
      margin: 0;
      text-align: left;
      padding-top: 1rem;
      text-transform: uppercase;
    }
  }

  .additives {
    padding-top: 30px;

    .gallery {
      padding: 15px 0;

      .carousel {
        box-shadow: 0 10px 13px -7px #757575, 5px 5px 15px 5px rgba(178, 178, 178, 0);

        .carousel-item {
          height: 500px;

          img {
            position: absolute;
            top: 0;
            left: 0;
            min-height: 500px;
          }
        }
      }

      .carousel div {
        height: 100%;
      }
    }

    .comments {
      .row {
        justify-content: center;
        position: relative;
        padding: 10px;

        i {
          position: absolute;
          font-size: 2rem;
          top: -11px;
          right: 0;
        }
        .fa-sort-up {
          top: 0;
        }
      }
    }
  }

  i {
    text-align: center;
    display: block;
    font-size: 11px;
  }

  h5 {
    text-align: center;
    padding: 20px;
    margin: 0;
  }

  .check label {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    & > span {
      color: black;
      padding: 0 0 1rem 0.75rem;
    }

    & > input {
      height: 25px;
      min-width: 25px;
      appearance: none;
      border: 1px solid grey;
      outline: none;
      cursor: pointer;
      :hover {
        border: 1px solid black;
        background-color: #f0f0f0;
        transition-duration: 0.3s;
      }
      &:checked {
        border: 1px solid black;
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
    }
  }

  @media screen and (max-width: 992px) {
    .background-image .title {
      font-size: 25px;
    }
    .properties .wrap {
      padding: 0;
      .row {
        width: 100%;
      }
    }

    .details .ingredients,
    .details .steps {
      flex: 0 0 100%;
      max-width: 100%;
      margin-top: 10px;
    }
    .ingredients .title,
    .steps .title {
      font-size: 20px;
    }

    .prop p {
      font-size: 80%;
    }
  }

  @media screen and (max-width: 768px) {
    .label {
      flex: 0 0 75%;
      max-width: 75% !important;
    }
  }
}
</style>
