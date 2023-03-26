<template>
  <div class="blue-button" @click="callback($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Button",
  methods: {
    callback: function (e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.blue-button {
  width: 100%;
  text-align: center;
  background-color: var(--color-blue);
  border-radius: 0.25rem;
  color: white;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  line-height: 1.5;
  transition: var(--btn-transition);
  padding: 7px 15px;
  text-transform: uppercase;

  &:hover {
    background-color: white;
    color: var(--color-blue);
    border-color: var(--color-blue);
  }
}
</style>
