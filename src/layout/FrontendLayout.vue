<template>
  <div>
    <!-- 顶部导航 -->
    <div class="header">
      <div class="logo">ChatGPT中心</div>
      <div class="right-header">
        <div v-if="isLogin">
          <a-button size="mini" type="text" @click="jumpToBackend"
            >后台</a-button
          >
          <a-button size="mini" type="text" @click="handlerLogoutSubmit"
            >退出</a-button
          >
        </div>
        <div v-else>
          <a-button size="mini" type="text" @click="jumpToLogin">登录</a-button>
        </div>
      </div>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
import { IsLogin } from "@/composables/user";
import { LOGOUT } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import Cookies from "js-cookie";

// 判断是否登录
let isLogin = IsLogin();

// 获取路由
const router = useRouter();

// 跳转到登录页面
const jumpToLogin = () => {
  Cookies.remove("username");
  Cookies.remove("session");
  isLogin = false;
  router.push("/login");
};

// 跳转后台
const jumpToBackend = () => {
  router.push("/backend/bloglist");
};

// 退出处理函数
const handlerLogoutSubmit = async () => {
  try {
    await LOGOUT();
    router.push("/login");
  } catch (err) {
    Message.error({
      content: err.message,
      duration: 1000,
    });
  } finally {
    isLogin = false;
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgb(229, 230, 235);
  height: 45px;
}

.logo {
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
}

.right-header {
  margin-left: auto;
}

.content {
  margin: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
