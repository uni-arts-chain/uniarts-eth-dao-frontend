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
        path: "votes",
        name: "votes",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/Votes.vue"),
      },
      {
        path: "history",
        name: "history",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/Rewards.vue"),
      },
      {
        path: "unbond",
        name: "unbondHistory",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile/UnbondHistory.vue"),
      },
      {
        path: "collection",
        name: "collection",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile/Collection.vue"),
      },
      {
        path: "migrate",
        name: "profileMigrate",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/Migrate.vue"),
      },
    ],
  },
  {
    path: "/migrate",
    name: "migrate",
    component: () => import(/* webpackChunkName: "migrate" */ "../views/Profile/Migrate.vue"),
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
    path: "/marketplace/auctions",
    name: "marketplaceAuctions",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/MarketAuctions.vue"),
  },
  {
    path: "/marketplace/buynow",
    name: "marketplaceBuyNow",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/MarketBuyNow.vue"),
  },
  {
    path: "/marketplace/detail/:id",
    name: "nftDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Detail.vue"),
  },
  {
    path: "/marketplace/auction/:id/:id2",
    name: "auctionDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Auction.vue"),
  },
  {
    path: "/marketplace/buy/:id",
    name: "buyDetail",
    component: () => import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Buy.vue"),
  },
  {
    path: "/vote",
    name: "vote",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/Index.vue"),
  },
  {
    path: "/vote/rule",
    name: "voteRule",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/Rule.vue"),
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
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "session" */ "../views/Session/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "comingSoon",
    component: () => import(/* webpackChunkName: "session" */ "../views/Session/ComingSoon.vue"),
  },
];
export default routes;
