import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "airdrop" */ '../views/Airdrop.vue'),
  },
  {
    path: '/airdrop',
    name: 'Airdrop',
    component: () => import(/* webpackChunkName: "airdrop" */ '../views/Airdrop.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
