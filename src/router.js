import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Overview.vue';
import Manage from './views/Manage.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: Home,
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
    },
  ],
});
