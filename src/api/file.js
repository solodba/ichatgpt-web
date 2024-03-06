import client from "./client";

// 上传文件
const UPLOADFILE = (data) => {
  return client({
    url: "/ichatgpt/api/v1/file/",
    method: "post",
    data: data,
  });
};

export { UPLOADFILE };
