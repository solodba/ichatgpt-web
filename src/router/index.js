// 导入相关组件
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FrontendLayout from "@/layout/FrontendLayout.vue";

// 导入前台组件
import CreateChat from "@/views/frontend/CreateChat.vue";
import CreateImage from "@/views/frontend/CreateImage.vue";
import UploadFile from "@/views/frontend/UploadFile.vue";
import ListModel from "@/views/frontend/ListModel.vue";

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
      path: "/ichatgpt",
      name: "ichatgpt",
      component: FrontendLayout,
      children: [
        {
          path: "chat",
          name: "chat",
          component: () => CreateChat,
        },
        {
          path: "image",
          name: "image",
          component: () => CreateImage,
        },
        {
          path: "file/upload",
          name: "file/upload",
          component: () => UploadFile,
        },
        {
          path: "model",
          name: "model",
          component: () => ListModel,
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
