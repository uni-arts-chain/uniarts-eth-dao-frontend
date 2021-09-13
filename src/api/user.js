const apiList = [
  {
    name: "login",
    method: "POST",
    desc: "登录",
    path: "/members/user_address_login",
    mockPath: "/members/user_address_login",
    params: {
      address: "",
      message: "",
      signature: "",
    },
    options: {},
  },
  {
    name: "logout",
    method: "POST",
    desc: "退出登录",
    path: "/members/logout",
    mockPath: "/members/logout",
    params: {},
    options: {},
  },
  {
    name: "loginMessage",
    method: "GET",
    desc: "获取登录凭证",
    path: "/members/get_login_message",
    mockPath: "/members/get_login_message",
    params: {},
    options: {},
  },
  {
    name: "getInfo",
    method: "GET",
    desc: "登录",
    path: "/members/user_info",
    mockPath: "/members/user_info",
    params: {},
    options: {},
  },
];

export default apiList;
