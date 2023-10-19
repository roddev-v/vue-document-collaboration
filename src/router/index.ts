import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/app",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/",
    name: "auth",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AuthView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
