import client from "./client";

// 创建聊天
const CREATTRANSLATION = (data) => {
  return client({
    url: "/ichatgpt/api/v1/audio/translation/",
    method: "post",
    data: data,
  });
};

export { CREATTRANSLATION };
