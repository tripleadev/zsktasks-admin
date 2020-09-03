<template>
  <div id="home">
    <h1>cześć {{ name.toLowerCase() }}!</h1>
    <h4>twój email: {{ username }}</h4>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    name() {
      console.log(this.$store.state);
      return this.$store.state.user.name;
    },
    username() {
      return this.$store.state.user.email;
    },
  },
};
</script>
<style lang="scss">
#home {
  padding: 20px;

  h1 {
    font-size: 50px;
  }
}
</style>
