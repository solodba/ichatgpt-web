import axios from "axios";
// import Cookies from "js-cookie";

// 创建一个axios客户端
const client = axios.create({
  baseURL: "http://127.0.0.1:8888",
  timeout: 999999999999999,
  // withCredentials: true,
});

// request拦截器, 主要把cookie传递给后端, 不然创建博客等操作无法操作
// client.interceptors.request.use((request) => {
//   // request.headers.Cookie =
//   //   "username=" + Cookies.get("username") + "; " + Cookies.get("session");
//   return request;
// });

// response拦截器, 主要错误信息处理
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // axios处理产生的错误
    let errMsg = `${error.code}: ${error.message}`;
    // 业务逻辑处理产生的错误
    if (error.response?.data) {
      if (error.response.data.code !== 200) {
        errMsg = error.response.data.msg;
      }
    }
    return Promise.reject(new Error(errMsg));
  }
);

export default client;
