<template>
  <div v-loading="loading">
    <img width="60px" :src="src" alt="" @load="imgLoad" @error="imgLoad" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    imgLoad() {
      this.loading = false;
    },
  },
  watch: {
    src() {
      this.loading = true;
    },
  },
};
</script>
