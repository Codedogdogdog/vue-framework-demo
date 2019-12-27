<template>
  <Main>模版一</Main>
</template>

<script>
import Main from 'public/components/Main';

import methods from './src/methods';
import computed from './src/computed';
import watch from './src/watch';

export default {
  methods,
  computed,
  watch,
  components: {
    Main,
  },
};
</script>

<style lang="scss">
@import 'public/sass/init.scss', './sass/style.scss';
</style>
