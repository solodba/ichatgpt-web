import client from "./client";

// web上传文件
const uploadUrl = "http://127.0.0.1:8888/ichatgpt/api/v1/file/upload"

const WEEBUPLOADFILE = (data) => {
    return fetch(uploadUrl,{
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body:data,
    })
}

export { WEEBUPLOADFILE };
