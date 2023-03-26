<template>
  <div className="container">
    <Recipes />
  </div>
</template>

<script>
import Recipes from "@/views/Recipes.vue";

export default {
  name: "Home",
  components: {
    Recipes,
  },
};
</script>
