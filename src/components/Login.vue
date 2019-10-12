<template>
  <div id="login">
    <h1>zskTasks Admin Panel</h1>
    <form>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        v-model="emailField"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="passwordField"
      />
      <input type="submit" value="Login" v-on:click="submitLogin"/>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      emailField: '',
      passwordField: '',
    };
  },
  methods: {
    submitLogin(e) {
      e.preventDefault();

      axios.post('https://zsktasks-api.herokuapp.com/admin/login', { email: this.emailField, password: this.passwordField }).then((res) => {
        this.$store.commit('login', res.data);
      }).catch((err) => {
        alert(err.response.data.info.message); //eslint-disable-line
      });
    },
  },
};
</script>
<style lang="scss">
  #login {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: #28146d;
      text-align: center;
    }

    input[type="email"], input[type="password"] {
      display: block;
      padding: 5px;
      max-width: 400px;
      border: none;
      border-bottom: solid #28146d 2px;
      font-size: 20px;
      outline: none;
      margin: 20px;
      background-color: #ffffff;
      transition: all .3s;

      &:focus {
        box-shadow: 0 4px 4px -4px #28146d;
      }
    }

    input[type="submit"] {
      display: block;
      padding: 5px;
      font-size: 20px;
      border: none;
      border-bottom: solid #28146d 2px;
      margin: 0 auto 0 auto;
      background-color: #ffffff;
      cursor: pointer;
      transition: all .3s;
      outline: none;

      &:hover {
        box-shadow: 0 4px 4px -4px #28146d;
      }
    }
  }
</style>
