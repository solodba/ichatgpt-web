import Cookies from "js-cookie";
const beforeEachHandler = (to, from, next) => {
  if (to.fullPath.indexOf("/backend") === 0) {
    const username = Cookies.get("username");
    if (username === null || username === "" || username === undefined) {
      next({
        path: "/login",
        query: {
          redirect: to.name,
          ...to.query,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

// const afterEachHandler = (to, from) => {
//   // 功能待定
//   console.log(to, from);
// };

export { beforeEachHandler };
