<template>
  <div class="text-input">
    <label class="text">
      <component
        :is="tag"
        class="text__field"
        placeholder=""
        :name="name"
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :id="id"
        >{{ innerText }}</component
      >
      <span class="text__label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "StandardInput",
  props: ["tag", "value", "type", "name", "label", "id", "innerText"],
};
</script>

<style scoped lang="scss">
.text-input {
  width: 100%;
  margin-bottom: 34px;

  .text {
    position: relative;
    width: 100%;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }

    &__label {
      position: absolute;
      left: -15px;
      top: 0;
      padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * 0.5);
      margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * 0.5);
      background: pink;
      white-space: nowrap;
      transform: translate(0, 0);
      transform-origin: 0 0;
      background: var(--background-color);
      transition: transform 120ms ease-in;
      font-weight: bold;
      line-height: 1.2;
      color: var(--form-color);
      font-size: 1rem;
      cursor: text;
    }

    &__field {
      box-sizing: border-box;
      display: block;
      width: 100%;
      border: 2px solid var(--form-color);
      padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
      color: currentColor;
      background: transparent;
      border-radius: var(--size-radius);

      &:focus,
      &:not(:placeholder-shown) {
        & + .text__label {
          transform: translate(0.25rem, -65%) scale(0.8);
          color: var(--color-blue);
        }
      }
    }
  }
}
</style>
