<template>
  <div class="text-input">
    <input type="range" :value="currentValue" @input="updateValue" min="1" max="3" />
    <label id="range-text" v-text="diffOption"></label>
  </div>
</template>

<script>
export default {
  name: "CheckboxInput",
  props: ["options"],
  data() {
    return {
      values: [],
      currentValue: 1,
      diffOption: "Łatwy",
    };
  },
  methods: {
    updateValue: function ($event) {
      this.currentValue = parseInt($event.target.value);
      switch (this.currentValue) {
        case 1:
          this.diffOption = "Łatwy";
          break;
        case 2:
          this.diffOption = "Średni";
          break;
        case 3:
          this.diffOption = "Trudny";
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.text-input {
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 60%;
  }
  label {
    padding-left: 5%;
    width: 40%;
  }
}
</style>
