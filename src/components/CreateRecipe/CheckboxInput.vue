<template>
  <div class="text-input">
    <label v-for="(option, index) in options" :key="index">
      <input type="checkbox" :name="option.id" @change="check($event)" />
      <span class="input__label">{{ option.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckboxInput",
  props: ["options"],
  data() {
    return {
      values: [],
    };
  },
  methods: {
    check: function (event) {
      if (event.target.checked) this.values.push(event.target.name);
      else this.values.splice(this.values.indexOf(event.target.name), 1);
      this.$emit("input", this.values);
    },
  },
};
</script>

<style scoped lang="scss">
.text-input {
  position: relative;
  line-height: 14px;
  width: 100%;

  span {
    color: var(--form-color);
    font-size: 14px;
    text-transform: uppercase;
    top: -1px;
    position: relative;
  }
  label {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
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
      &:hover {
        border: 2px solid var(--form-color);
        background-color: #f0f0f0;
        transition-duration: 0.3s;
      }

      &:checked {
        border: 2px solid var(--form-color);
        background-color: transparent;
        background-image: url("../../assets/images/check_x.png");
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
}
</style>
