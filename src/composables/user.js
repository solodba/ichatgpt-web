import Cookies from "js-cookie";

const IsLogin = () => {
  let username = Cookies.get("username");
  let session = Cookies.get("session");
  if (username === "" || username === undefined || username === null) {
    return false;
  }
  if (session === "" || session === undefined || session === null) {
    return false;
  }
  return true;
};

export { IsLogin };
