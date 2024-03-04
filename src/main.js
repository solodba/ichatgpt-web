import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 引入Arco Design插件库
import ArcoVue from "@arco-design/web-vue";
// 引入Arco Design样式
import "@arco-design/web-vue/dist/arco.css";
// 引入Arco Design图标插件库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import axios from "axios";

import "./assets/main.css";

const app = createApp(App);
axios.defaults.withCredentials = true;

app.use(createPinia());
app.use(router);

// 使用Arco Design插件
app.use(ArcoVue);
// 使用Arco Design图标插件
app.use(ArcoVueIcon);

app.mount("#app");
