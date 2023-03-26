<template>
  <div class="radio">
    <label v-for="(difficulty, index) in difficulties" :key="index">
      <input type="radio" :name="name" :value="index" @change="$emit('input', $event.target.value)" />
      <span class="radio__label">{{ difficulty }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioInput",
  props: ["value", "difficulties", "name", "id"],
};
</script>

<style scoped lang="scss">
.radio {
  position: relative;
  line-height: 14px;
  width: 100%;

  label {
    display: inline-flex;
    cursor: pointer;
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
      :hover {
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
          position: relative;
          left: 0.7rem;
          top: 0.2rem;
        }
      }
    }
    span {
      color: var(--form-color);
      font-size: 15px;
      text-transform: uppercase;
      top: -3px;
    }
  }
}
</style>
