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
    path: "/souvenirs",
    name: "Souvenirs",
    component: () => import(/* webpackChunkName: "souvenirs" */ "../views/Souvenirs/Index.vue"),
  },
  {
    path: "/souvenirs/detail/:id",
    name: "SouvenirsDetail",
    component: () => import(/* webpackChunkName: "souvenirs" */ "../views/Souvenirs/Detail.vue"),
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
        children: [
          {
            path: "arts",
            name: "arts",
            component: () =>
              import(/* webpackChunkName: "profile" */ "../views/Profile/MarketCollection.vue"),
          },
          {
            path: "collectable",
            name: "collectable",
            component: () =>
              import(/* webpackChunkName: "profile" */ "../views/Profile/MarketCollectable.vue"),
          },
          {
            path: "souvenirs",
            name: "souvenirs",
            component: () =>
              import(/* webpackChunkName: "profile" */ "../views/Profile/MarketSouvenirs.vue"),
          },
        ],
      },
      {
        path: "vault",
        name: "myVault",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/Vault.vue"),
      },
      {
        path: "my_order",
        name: "myOrder",
        component: () => import(/* webpackChunkName: "profile" */ "../views/Profile/MyOrder.vue"),
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
    children: [
      {
        path: "",
        name: "marketplaceArt",
        component: () =>
          import(/* webpackChunkName: "marketplace" */ "@/views/Marketplace/List/ArtList.vue"),
      },
      {
        path: "collectable",
        name: "marketplaceCollectable",
        component: () =>
          import(
            /* webpackChunkName: "marketplace" */ "../views/Marketplace/List/CollectableList.vue"
          ),
      },
      {
        path: "souvenirs",
        name: "marketplaceSouvenirs",
        component: () =>
          import(
            /* webpackChunkName: "marketplace" */ "../views/Marketplace/List/SouvenirsList.vue"
          ),
      },
    ],
  },
  {
    path: "/marketplace/auctions",
    name: "marketplaceAuctions",
    component: () =>
      import(
        /* webpackChunkName: "marketplace" */ "../views/Marketplace/Markets/ArtMarketAuctions.vue"
      ),
  },
  {
    path: "/marketplace/souvenirs/auctions",
    name: "marketplaceSouvenirsAuctions",
    component: () =>
      import(
        /* webpackChunkName: "souvenirs" */ "../views/Marketplace/Markets/SouvenirsMarketAuctions.vue"
      ),
  },
  {
    path: "/marketplace/buynow",
    name: "marketplaceBuyNow",
    component: () =>
      import(
        /* webpackChunkName: "marketplace" */ "../views/Marketplace/Markets/ArtMarketBuyNow.vue"
      ),
  },
  {
    path: "/marketplace/souvenirs/buynow",
    name: "marketplaceSouvenirBuyNow",
    component: () =>
      import(
        /* webpackChunkName: "souvenirs" */ "../views/Marketplace/Markets/SouvenirsMarketBuyNow.vue"
      ),
  },
  {
    path: "/marketplace/detail/:id",
    name: "nftDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Details/ArtDetail.vue"),
  },
  {
    path: "/marketplace/auction/:id/:id2",
    name: "auctionDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/Auctions/ArtAuction.vue"),
  },
  {
    path: "/marketplace/souvenir-auction/:id",
    name: "auctionSouvenirDetail",
    component: () =>
      import(
        /* webpackChunkName: "souvenirs" */ "../views/Marketplace/Auctions/SouvenirAuction.vue"
      ),
  },
  {
    path: "/marketplace/buy/:id",
    name: "buyDetail",
    component: () =>
      import(/* webpackChunkName: "marketplace" */ "../views/Marketplace/BuyNows/ArtBuy.vue"),
  },
  {
    path: "/marketplace/souvenir-buy/:id",
    name: "buySouvenirDetail",
    component: () =>
      import(/* webpackChunkName: "souvenirs" */ "../views/Marketplace/BuyNows/SouvenirBuy.vue"),
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
    path: "/vote/votedlist",
    name: "votedList",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/VotedList.vue"),
  },
  {
    path: "/vote/auctionlist",
    name: "auctionList",
    component: () => import(/* webpackChunkName: "vote" */ "../views/Vote/AuctionList.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "session" */ "../views/Session/SelectWallet.vue"),
  },
  {
    path: "/login/:wallet/:address",
    name: "loginAddress",
    component: () => import(/* webpackChunkName: "session" */ "../views/Session/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "comingSoon",
    component: () => import(/* webpackChunkName: "session" */ "../views/Session/ComingSoon.vue"),
  },
];
export default routes;
