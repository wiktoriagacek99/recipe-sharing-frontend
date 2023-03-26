<template>
  <div class="main-photo">
    <picture-input
      ref="pictureInput"
      @change="onChange"
      width="300"
      height="300"
      margin="16"
      accept="image/jpeg,image/png"
      size="10"
      buttonClass="btn"
      :value="value"
      :prefill="imgURL"
      :customStrings="{
        drag: 'Zdjęcie główne',
      }"
    >
    </picture-input>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";

export default {
  name: "app",
  props: ["value"],
  data() {
    return {
      imgURL: "",
    };
  },
  components: {
    PictureInput,
  },
  methods: {
    onChange(image) {
      if (image) this.$emit("input", this.$refs.pictureInput.file);
    },
  },
};
</script>

<style lang="scss">
.main-photo {
  max-height: 300px;
  height: 300px;
  position: relative;

  .preview-container {
    width: 95% !important;
    margin: 0 !important;
    max-width: 100% !important;
    height: 300px !important;
    border: 2px solid var(--form-color);
    border-radius: 0 !important;
  }

  .picture-preview {
    height: 300px !important;
    background-color: white !important;
  }

  .picture-input .btn {
    display: none !important;
  }
  .picture-inner {
    top: -300px !important;

    span {
      color: var(--form-color);
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .swiper-slide,
  .vue-lightbox-content {
    max-width: 100% !important;
  }

  .modal-mask {
    z-index: 10002 !important;
  }
}
@media screen and (max-width: 992px) {
  .main-photo .preview-container {
    width: 100% !important;
  }
}
</style>
