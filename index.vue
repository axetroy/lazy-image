<template>
  <div id="vue-root">
    <h2>Vue Version</h2>

    <div>
      <lazy-image style="max-width: 100%;" v-for="src in images" :key="src" :src="src" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LazyImage from "./vue/index.vue";
import images from "./images2.json";

export default Vue.extend({
  data() {
    return {
      images
    };
  },
  components: {
    "lazy-image": LazyImage
  }
});
</script>