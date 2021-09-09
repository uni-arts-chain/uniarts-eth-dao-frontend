const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home/Index.vue"),
  },
  {
    path: "/airdrop",
    name: "Airdrop",
    component: () => import(/* webpackChunkName: "airdrop" */ "../views/Airdrop/Index.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/Index.vue"),
    children: [
      {
        path: "",
        name: "assets",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/Assets.vue"),
      },
      {
        path: "history",
        name: "history",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/History.vue"),
      },
      {
        path: "collection",
        name: "collection",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile/Collection.vue"),
      },
    ],
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: () => import(/* webpackChunkName: "widthdraw" */ "../views/Profile/Withdraw.vue"),
  },
  {
    path: "/artist/:id",
    name: "artist",
    component: () => import(/* webpackChunkName: "artist" */ "../views/Artist/Index.vue"),
  },
  {
    path: "/marketplace",
    name: "marketplace",
    component: () => import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Index.vue"),
  },
  {
    path: "/marketplace/:id",
    name: "nftDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Detail.vue"),
  },
  {
    path: "/marketplace/auction/:id",
    name: "auctionDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Auction.vue"),
  },
  {
    path: "/vote",
    name: "vote",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/Index.vue"),
  },
  {
    path: "/vote/:id",
    name: "voteDetail",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/VoteDetail.vue"),
  },
  {
    path: "/vote/votelist",
    name: "voteList",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/VoteList.vue"),
  },
  {
    path: "/vote/auctionlist",
    name: "auctionList",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/AuctionList.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "comingSoon",
    component: () => import(/* webpackChunkName: "session" */ "../views/Session/ComingSoon.vue"),
  },
];
export default routes;
