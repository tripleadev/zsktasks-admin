import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
  key: "zsktasks-admin",
  storage: window.localStorage,
});

const store = new Vuex.Store({
  plugins: [vuexPersistence.plugin],
  state: {
    loginToken: "",
    isLoggedIn: false,
    user: {
      id: "",
      email: "",
      name: "",
    },
  },
  mutations: {
    login: (state, payload) => {
      state.user.id = payload.user.UserID;
      state.user.email = payload.user.Username;
      state.user.name = payload.user.Name;
      state.loginToken = payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user.id = "";
      state.user.email = "";
      state.user.name = "";
      state.loginToken = "";
      state.isLoggedIn = false;
    },
  },
});

export default store;
