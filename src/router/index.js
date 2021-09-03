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
  {
    path: '/vote',
    component: () => import(/* webpackChunkName: "Building" */ '../components/Building.vue'),
  },
  {
    path: '/marketplace',
    component: () => import(/* webpackChunkName: "Building" */ '../components/Building.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
