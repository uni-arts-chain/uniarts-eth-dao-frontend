import { createRouter, createWebHistory } from "vue-router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import routes from "./routes";
import { routeFrom, routeTo } from "@/interceptors/router";

nprogress.configure({
  easing: "ease",
  speed: 200,
  showSpinner: false,
});

const router = createRouter({
  history: createWebHistory("/"),
  routes: routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((from, to, next) => {
  nprogress.set(0.0);
  nprogress.start();
  routeFrom(from, to);
  next();
});
router.afterEach((from, to) => {
  nprogress.set(0);
  nprogress.done();
  routeTo(from, to);
});

export default router;
