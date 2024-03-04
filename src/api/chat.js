import client from "./client";

// 创建聊天
const CREATECHAT = (data) => {
  return client({
    url: "/ichatgpt/api/v1/chat/",
    method: "post",
    data: data,
  });
};

export { CREATECHAT };
