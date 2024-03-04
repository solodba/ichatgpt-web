<template>
  <div class="login-form">
    <a-form
      ref="loginForm"
      :model="form"
      :style="{ width: '400px', height: '100%', justifyContent: 'center' }"
      @submit="handleSubmit"
    >
      <a-form-item>
        <div class="title">ChatGPT中心</div>
      </a-form-item>
      <a-form-item
        field="username"
        label="用户"
        :rules="[{ required: true, message: '请输入用户名' }]"
        :validate-trigger="['change', 'input']"
        hide-asterisk
      >
        <a-input v-model="form.username" placeholder="请输入用户名">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        label="密码"
        :rules="[
          { required: true, message: '请输入密码' },
          { minLength: 5, message: '密码长度必须大于5位' },
        ]"
        :validate-trigger="['change', 'input']"
        hide-asterisk
      >
        <a-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="loginLoading"
          style="width: 100%"
          type="primary"
          html-type="submit"
          >{{ loginButtonText }}</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { LOGIN } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

let loginButtonText = ref("登录");
let loginLoading = ref(false);

// 使用非BasicAuth认证
// const handleLogin = async (user, pwd) => {
//   try {
//     let resp = await axios.post(
//       "http://127.0.0.1:8888/vblog/v1/api/user/login",
//       {
//         username: user,
//         password: pwd,
//       }
//     );
//     if (resp.data.code === 200) {
//       localStorage.setItem("username", form.username);
//       localStorage.setItem("password", form.password);
//       const { redirect, ...othersQuery } = router.currentRoute.value.query;
//       router.push({
//         name: redirect || "bloglist",
//         query: {
//           ...othersQuery,
//         },
//       });
//     } else {
//       Message.error("用户名或者密码不正确");
//     }
//   } catch (err) {
//     Message.error("用户名或者密码不正确");
//   }
// };

// const handleSubmit = (data) => {
//   if (data.errors === undefined) {
//     let form = data.values;
//     handleLogin(form.username, form.password);
//   }
// };

// 使用BasicAuth认证
const handleSubmit = async (data) => {
  if (data.errors === undefined) {
    try {
      loginButtonText.value = "登录中";
      loginLoading.value = true;

      let resp = await LOGIN(data.values);
      Cookies.set("username", resp.msg.Username);
      Cookies.set("session", resp.msg.Id);

      let routeDirectName = "bloglist";
      const { redirect, ...otherQueryParam } = router.currentRoute.value.query;
      if (redirect) {
        routeDirectName = redirect;
      }
      let routeDirectQueryParam = otherQueryParam;

      router.push({
        name: routeDirectName,
        query: routeDirectQueryParam,
      });
    } catch (err) {
      Message.error({
        content: `登录失败! 原因: ${err.message}`,
        duration: 1000,
      });
    } finally {
      loginButtonText.value = "登录";
      loginLoading.value = false;
    }
  }
};
</script>

<style scoped>
.login-form {
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  font-weight: bold;
}
</style>
