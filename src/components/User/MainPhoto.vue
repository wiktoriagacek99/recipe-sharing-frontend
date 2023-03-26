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
      :customStrings="{
        drag: 'Wybierz zdjęcie',
      }"
    >
    </picture-input>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    PictureInput,
  },
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
  },
};
</script>

<style lang="scss">
.main-photo {
  max-height: 200px;
  height: 200px;
  position: relative;
}

.preview-container {
  width: 200px !important;
  border-radius: 50% !important;
  margin: 0 !important;
  max-width: 100% !important;
  height: 200px !important;
  border: 2px dashed var(--form-color);
}

.picture-preview {
  height: 200px !important;
  background-color: white !important;
}

.picture-input button {
  display: none !important;
}
.picture-inner {
  top: -200px !important;
  border: none !important;

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

.edit {
  background-color: #0a66c2;
  width: 50px;
  height: 50px;
  display: inline-block;
  color: white;
  position: absolute;
  right: 50px;
  bottom: 0;
  border-radius: 50%;
  z-index: 10002;

  i,
  i::before {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
  }

  .btn {
    display: none !important;
  }
}

@media screen and (max-width: 992px) {
  .preview-container {
    width: 250px !important;
    height: 250px !important;
    margin: 0 auto !important;
  }
}
</style>
