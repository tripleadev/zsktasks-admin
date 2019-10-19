import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Overview.vue';
import Manage from './views/Manage.vue';
import Edit from './views/Edit.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
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
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      props: true,
    },
  ],
});
