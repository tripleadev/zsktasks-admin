<template>
  <div id="app">
    <div id="nav">
      <h2>
        zskTasks
        <br />Admin Panel
      </h2>
      <router-link to="/">Home</router-link>
      <hr class="navSeparator" />
      <router-link to="/manage">Zarządzaj zadaniami</router-link>
      <hr class="navSeparator" />
      <router-link to="/schedule">Harmonogram zeszytu</router-link>
      <hr class="navSeparator" />
      <a href="http://zsktasks.gitlab.io">Strona zskTasks</a>
      <hr class="navSeparator" />
      <a v-on:click="logout" href="#">Wyloguj</a>
    </div>
    <div id="panel" v-if="isLoggedIn">
      <router-view />
    </div>
    <login_form v-if="!isLoggedIn"></login_form>
  </div>
</template>
<script>
import LoginForm from "./components/Login.vue";

export default {
  name: "App",
  components: {
    login_form: LoginForm
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}
#nav {
  width: 250px;
  height: 100vh;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #28146d;
  color: white;
  text-align: center;
  font-size: 18px;

  a {
    color: white;
    margin: 0 7px 0 7px;
  }

  h2 {
    margin: 20px 0 20px 0;
    font-weight: 400;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 100px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 0.8em;
  }

  .navSeparator {
    display: none;
  }
}
#panel {
  width: 100%;

  @media screen and (max-width: 800px) {
    height: 100%;
  }
}
</style>
