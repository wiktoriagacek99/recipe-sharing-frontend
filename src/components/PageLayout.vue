<template>
  <div>
    <header class="header">
      <Header />
    </header>
    <article class="article">
      <div class="container">
        <div class="row">
          <router-view />
          <CookiesMessage></CookiesMessage>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CookiesMessage from "@/components/CookiesMessage.vue";

export default {
  data() {
    return {
      featuresOpen: false,
      searchToggled: false,
      opened: false,
    };
  },
  components: {
    Header,
    CookiesMessage,
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999999;
  padding: 15px;
  box-shadow: var(--std-shadow);

  .row {
    max-width: 1140px;
    margin: 0 auto;
  }
  a,
  a:hover,
  i,
  #search input {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
}

.article {
  top: 84px;
  position: relative;
  padding-bottom: 75px;
}
</style>
