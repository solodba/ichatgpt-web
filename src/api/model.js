import client from "./client";

// 上传文件
const LISTMODEL = () => {
  return client({
    url: "/ichatgpt/api/v1/model",
    method: "get",
  });
};

export { LISTMODEL };
