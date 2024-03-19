import client from "./client";

// 创建微调任务
const CREATEFUNETINE = (data) => {
  return client({
    url: "/ichatgpt/api/v1/finetune/",
    method: "post",
    data: data,
  });
};

export { CREATEFUNETINE };
