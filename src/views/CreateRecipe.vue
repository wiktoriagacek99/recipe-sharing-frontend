<template>
  <div class="recipe" id="create-recipe">
    <div class="create">
      <h1>dodaj nowy przepis</h1>
      <h3>Główne informacje</h3>
      <Input v-model="formData.title" tag="input" type="text" name="title" id="title" label="Tytuł"> </Input>
      <Input v-model="formData.description" tag="textarea" name="description" id="description" label="Opis krótki">
      </Input>
      <Input v-model="formData.content" tag="textarea" name="content" id="content" label="Opis szczegółowy"> </Input>
      <div class="row w-100 m-0 mb-5">
        <MainImage v-model="formData.main_image" class="col-lg-6 col-sm-12 p-0"></MainImage>
        <Images v-model="formData.images" class="col-lg-6 col-sm-12 p-0"></Images>
      </div>
      <CheckboxInput v-model="formData.categories" :options="categories"></CheckboxInput>

      <h3>Składniki</h3>
      <div
        v-for="(ingredient, index) in formData.ingredients"
        :key="index"
        class="text-input row w-100 m-0 ingredients"
      >
        <div class="col-md-7 col-sm-12">
          <Input
            v-model="ingredient.name"
            tag="input"
            type="text"
            :name="'ingredient.' + index + '.name'"
            :id="'ingredient.' + index + '.name'"
            label="Nazwa"
          >
          </Input>
        </div>
        <div class="col-md-2 col-sm-7 p-0">
          <Input
            v-model="ingredient.quantity"
            tag="input"
            type="text"
            :name="'ingredient.' + index + '.quantity'"
            :id="'ingredient.' + index + '.quantity'"
            label="Ilość"
          >
          </Input>
        </div>
        <div class="select col-sm-3 col-md-2 p-0">
          <select v-model="ingredient.unit">
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>
        <div class="col-md-1 col-sm-2 text-right">
          <Button @click="deleteIngredient(index)" class="remove"><i class="fas fa-trash-alt"></i> </Button>
        </div>
      </div>
      <Button class="mb-5 col-md-4 col-sm-12" @click="addIngredient()"
        ><i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp; Dodaj składnik</Button
      >
      <h3>Kroki</h3>
      <div v-for="(step, index) in formData.steps" :key="index" class="text-input row w-100 m-0 steps">
        <div class="col-1">
          <span class="index"> {{ index + 1 }}</span>
        </div>
        <div class="col-lg-10 col-sm-9">
          <Input
            v-model="step.content"
            tag="input"
            type="text"
            :name="'step.' + index + '.content'"
            :id="'step.' + index + '.content'"
            label="Krok"
          >
          </Input>
        </div>

        <div class="col-1 text-right">
          <Button @click="deleteStep(index)" class="remove"><i class="fas fa-trash-alt"></i> </Button>
        </div>
      </div>
      <Button class="mb-5 col-md-4 col-sm-12" @click="addStep()"
        ><i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp; Dodaj krok</Button
      >
      <h3>Składniki odżywcze</h3>
      <div class="row w-100 m-0">
        <Input
          v-model="formData.nutrients.calories"
          tag="input"
          type="number"
          name="calories"
          id="calories"
          label="Kalorie"
          class="col-lg-3 col-md-12"
        >
        </Input>
        <Input
          v-model="formData.nutrients.protein"
          tag="input"
          type="number"
          name="protein"
          id="protein"
          label="Białko"
          class="col-lg-3 col-md-12"
        >
        </Input>
        <Input
          v-model="formData.nutrients.fat"
          tag="input"
          type="number"
          name="fat"
          id="fat"
          label="Tłuszcz"
          class="col-lg-3 col-md-12"
        >
        </Input>
        <Input
          v-model="formData.nutrients.carbs"
          tag="input"
          type="number"
          name="carbs"
          id="carbs"
          label="Węglowodany"
          class="col-lg-3 col-md-12"
        >
        </Input>
      </div>
      <h3>Dodatkowe informacje</h3>
      <div class="row w-100 mb-5 m-0">
        <Input
          v-model="formData.preparation_time"
          tag="input"
          type="number"
          name="preparation_time"
          id="preparation_time"
          label="Czas"
          class="col-lg-6 col-md-12"
        >
        </Input>
        <Input
          v-model="formData.servings"
          tag="input"
          type="number"
          name="servings"
          id="servings"
          label="Porcje"
          class="col-lg-6 col-md-12"
        >
        </Input>

        <div class="row w-100 m-0 mb-5 difficulty">
          <div class="col-lg-4 col-sm-12">Trudność przepisu:</div>
          <div class="col-lg-8 col-sm-12">
            <RadioInput v-model="formData.difficulty" :difficulties="difficulties" name="difficulty" id="difficulty">
            </RadioInput>
          </div>
        </div>

        <Button @click="submitForm" class="submit"
          ><i class="fas fa-check"></i>&nbsp;&nbsp;&nbsp; Zapisz przepis</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../components/CreateRecipe/Input";
import MainImage from "../components/CreateRecipe/MainImage";
import Images from "../components/CreateRecipe/Images";
import Button from "../components/Button";
import RadioInput from "../components/CreateRecipe/RadioInput";
import CheckboxInput from "../components/CreateRecipe/CheckboxInput";
import axios from "../utils/axios";
import { serialize } from "object-to-formdata";

export default {
  name: "CreateRecipe",
  components: { CheckboxInput, RadioInput, Button, Input, MainImage, Images },
  data() {
    return {
      formData: {
        title: null,
        description: null,
        content: null,
        main_image: null,
        images: [],
        ingredients: [],
        steps: [],
        categories: [],
        nutrients: {
          calories: null,
          protein: null,
          fat: null,
          carbs: null,
        },
        preparation_time: null,
        servings: null,
        difficulty: null,
      },
      difficulties: {
        1: "Łatwy",
        2: "Średni",
        3: "Trudny",
      },
      categories: {},
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    addIngredient: function () {
      this.formData.ingredients.push({
        name: null,
        quantity: 0,
        unit: null,
      });
    },
    deleteIngredient: function (index) {
      this.formData.ingredients.splice(index, 1);
    },
    addStep: function () {
      this.formData.steps.push({
        content: null,
      });
    },
    deleteStep: function (index) {
      this.formData.steps.splice(index, 1);
    },
    submitForm: async function () {
      try {
        const formData = serialize(this.formData, {
          indices: true,
          allowEmptyArrays: true,
        });

        await axios.post("recipes", formData, {
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
    getCategories: function () {
      axios.get("/categories").then((response) => (this.categories = response.data.data));
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none !important;
}

.recipe {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 30px;
  box-shadow: var(--std-shadow);
  background-color: white;
  min-height: 89vh;
  margin-bottom: -4px;

  h3 {
    margin: 30px 0 40px 0;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    word-spacing: 2px;
  }
  .servings {
    display: block;
  }

  .create {
    position: relative;
    padding: 0 5%;
    width: 100%;
    text-align: left;

    h1 {
      text-transform: uppercase;
      text-align: center;
      padding-bottom: 30px;
    }
  }
}

.difficulty {
  align-items: center;
  justify-content: center;
  display: flex;
}

.btn {
  margin-top: 40px;
}

.ingredients .remove,
.steps .remove {
  height: 52px;
  width: 52px;
  text-align: center;
  padding: 7px 0;
  background-color: red !important;

  i {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.steps .index {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  height: 38px;
  max-width: 38px;
  border-radius: 50%;
  justify-content: right;
  position: relative;
  color: var(--color-blue);
  font-weight: bolder;
}

select {
  flex: 1;
  cursor: pointer;
  border: 2px solid var(--form-color);
  color: currentColor;
  background: transparent;
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  border-left: none;

  border-radius: var(--size-radius);
}
select::-ms-expand {
  display: none;
}
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 52px;
  border-radius: 0.25em;
  overflow: hidden;
}
.select::after {
  content: "▼";
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  transition: 0.25s all ease;
  pointer-events: none;
  border: 2px solid var(--form-color);
  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
}
.select:hover::after {
  color: var(--color-blue);
}

@media screen and (max-width: 992px) {
  .btn {
    max-width: 100% !important;
  }
  .ingredients div,
  .steps div {
    padding: 0 !important;
  }
  .ingredients div:first-child .text-input {
    margin-bottom: 25px;
  }

  .steps .index {
    right: 15px;
  }

  .difficulty div:first-child {
    margin-bottom: 15px;
  }

  .photos {
    margin-top: 15px;
  }
}
</style>
