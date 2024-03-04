// 导入相关组件
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FrontendLayout from "@/layout/FrontendLayout.vue";

// 导入前台组件
import CreateChat from "@/views/frontend/CreateChat.vue";

// 导入登录组件
import LoginView from "@/views/login/LoginView.vue";
import { beforeEachHandler } from "@/router/permession";

// 定义路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      // 前台页面
      path: "/frontend",
      name: "frontend",
      component: FrontendLayout,
      children: [
        {
          path: "createchat",
          name: "createchat",
          component: () => CreateChat,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => LoginView,
    },
    {
      path: "/errors/403",
      name: "PermissionDeny",
      component: () => import("@/views/errors/PermissionDeny.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/errors/NotFound.vue"),
    },
  ],
});

router.beforeEach(beforeEachHandler);
// router.afterEach(afterEachHandler);
export default router;
