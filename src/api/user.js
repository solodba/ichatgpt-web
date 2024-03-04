import client from "./client";
import Cookies from "js-cookie";

const LOGIN = (loginData) => {
  return client({
    url: "vblog/v1/api/user/login",
    method: "post",
    auth: { username: loginData.username, password: loginData.password },
  });
};

const LOGOUT = () => {
  let username = Cookies.get("username");
  Cookies.remove("username");
  Cookies.remove("session");
  return client({
    url: "vblog/v1/api/user/logout",
    method: "post",
    data: { username: username },
  });
};

export { LOGIN, LOGOUT };
