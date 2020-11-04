<template>
  <div id="app">
    Test
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(this.a())
  },
  methods: {
    async a () {

    }
  }
}
</script>

<style lang="scss">
#app {
  margin-top: 60px;
  color: $primary;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
