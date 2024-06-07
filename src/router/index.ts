import { authGuard } from "@/guards/auth.guard";
import { notAuthGuard } from "@/guards/not-auth.guard";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/app",
    name: "home",
    beforeEnter: authGuard,
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/app/notifications",
    name: "notifications",
    beforeEnter: authGuard,
    component: () => import("../views/NotificationsView.vue"),
  },
  {
    path: "/app/document/:id",
    name: "create-document",
    beforeEnter: authGuard,
    component: () => import("../views/DocumentView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    beforeEnter: notAuthGuard,
    component: () => import("../views/AuthView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
