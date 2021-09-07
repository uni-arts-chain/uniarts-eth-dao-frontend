const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home/Index.vue"),
  },
  {
    path: "/airdrop",
    name: "Airdrop",
    component: () => import(/* webpackChunkName: "home" */ "../views/Airdrop/Index.vue"),
  },
];
export default routes;
