import client from "./client";

// 创建聊天
const CREATEIMAGE = (data) => {
  return client({
    url: "/ichatgpt/api/v1/image/",
    method: "post",
    data: data,
  });
};

export { CREATEIMAGE };
