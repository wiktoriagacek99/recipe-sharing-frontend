<template>
  <div>
    <div class="rating">
      <star-rating
        :animate="true"
        :active-color="['var(--color-blue)']"
        :active-border-color="['#a8c3c0']"
        :border-width="3"
        :star-points="[23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17]"
        :active-on-click="true"
        :clearable="true"
        :star-size="35"
        :show-rating="false"
      ></star-rating>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";
import StarRating from "vue-star-rating";

export default {
  name: "Ratings",
  components: {
    StarRating,
  },

  methods: {
    isLogged: function () {
      return this.$auth.isLogged;
    },

    addRatings: async function (event) {
      try {
        await axios.post(
          "/recipes/" + this.$route.params.slug + "/ratings",
          { score: event.target.value },
          {
            headers: {
              Authorization: `Bearer ` + this.$store.state.token,
            },
          }
        );
        console.log("Ok!");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.rating {
  margin: 25px;
  justify-content: center;
  display: flex;

  .vue-star-rating {
    position: relative;
    bottom: 5px;
    right: 0;
    left: 0;
  }
}
</style>
