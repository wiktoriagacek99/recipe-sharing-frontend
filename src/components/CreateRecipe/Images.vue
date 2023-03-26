<template>
  <div class="photos">
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      :data-images="images"
      dragText="Dodaj więcej zdjęć"
      browseText="Max 5"
      :value="value"
    ></vue-upload-multiple-image>
  </div>
</template>

<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
export default {
  name: "app",
  props: ["value"],
  data() {
    return {
      images: [],
      files: [],
    };
  },
  components: {
    VueUploadMultipleImage,
  },
  methods: {
    uploadImageSuccess(formData) {
      for (let value of formData.values()) {
        this.files.push(value);
      }
      this.$emit("input", this.files);
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        done();
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },
  },
};
</script>

<style lang="scss">
.photos {
  max-height: 300px;
  height: 300px;
  position: relative;
  border: 2px solid var(--form-color);

  div .image-container {
    width: 100%;
    height: 250px;
    border: none;
    background-color: transparent;
  }

  .preview-image,
  .image-overlay {
    height: 250px !important;
  }
  .image-overlay {
    top: -5px;
  }
  .input-add-image label {
    display: inline-block;
  }

  .image-list-container {
    margin-top: 18px !important;
    .image-list-item {
      left: 5px;
      bottom: 5px;
    }
    .centered {
      width: 100% !important;
      height: 100% !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .show-img {
    max-width: 95% !important;
    height: 100%;
    max-height: 100% !important;
    margin: 0 auto;
  }
  .image-bottom-left {
    display: none !important;
  }
  .image-icon-edit,
  .image-icon-delete {
    width: 20px !important;
    height: 20px !important;
  }

  .image-bottom {
    bottom: -58px;
    left: 79%;
  }

  .icon-overlay {
    position: relative;
    top: 35%;
  }

  .image-icon-drag {
    display: none !important;
  }

  .image-center .text-center {
    position: relative;
    top: 10%;
    color: var(--form-color);
    font-size: 16px;
    text-transform: uppercase;
    .drag-text {
      color: var(--form-color);
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .vue-lightbox-figure .swiper-slide {
    width: 100% !important;
  }

  .modal-mask {
    z-index: 10002 !important;
  }
}
</style>
