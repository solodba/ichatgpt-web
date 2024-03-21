import client from "./client";

// web上传文件
const uploadUrl = "http://127.0.0.1:8888/ichatgpt/api/v1/file/upload";
const uploadAudioUrl =
  "http://127.0.0.1:8888/ichatgpt/api/v1/file/upload/audio";

const WEEBUPLOADFILE = (data) => {
  return fetch(uploadUrl, {
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
};

const WEBUPLOADMP3FILE = (data) => {
  return fetch(uploadAudioUrl, {
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
};

const UPLOADFILE = (data) => {
  return client({
    url: "/ichatgpt/api/v1/file/",
    method: "post",
    data: data,
  });
};

const LISTFILE = () => {
  return client({
    url: "/ichatgpt/api/v1/file",
    method: "get",
  });
};

export { WEEBUPLOADFILE, UPLOADFILE, LISTFILE, WEBUPLOADMP3FILE };
