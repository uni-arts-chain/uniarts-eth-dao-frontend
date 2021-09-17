const apiList = [
  {
    name: "getArtList",
    method: "GET",
    desc: "获取市场列表",
    path: "/arts/lists",
    mockPath: "/arts/lists",
    params: {
      page: "",
      per_page: "",
      keyword: "",
    },
    options: {},
  },
  {
    name: "getGroupList",
    method: "GET",
    desc: "获取投票组列表",
    path: "/arts/group",
    mockPath: "/arts/group",
    params: {
      type: "",
      page: "",
      per_page: "",
    },
    options: {},
  },
  {
    name: "getVoteList",
    method: "GET",
    desc: "获取投票列表",
    path: "/arts/detail",
    mockPath: "/arts/detail",
    params: {
      type: "",
      page: "",
      per_page: "",
    },
    options: {},
  },
  {
    name: "getArtistDetail",
    method: "GET",
    desc: "获取艺术家详情",
    path: "/members/artist",
    mockPath: "/members/artist",
    params: {
      uid: "",
    },
    options: {},
  },
  {
    name: "getArtDetail",
    method: "GET",
    desc: "获取艺术品详情",
    path: "/arts/{:id}",
    mockPath: "/members/artist/{:id}",
    params: {
      uid: "",
    },
    options: {},
  },
];

export default apiList;
