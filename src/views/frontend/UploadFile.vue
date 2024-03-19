<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <h1>上传文件</h1>
    <div>
      <a-upload
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :file-list="fileList"
        @change="handleUploadChange"
      >
        <a-button> <a-icon type="upload" /> 选择文件 </a-button>
      </a-upload>
      <a-button type="primary" @click="uploadFiles">上传</a-button>
    </div>
  </a-space>
</template>

<script setup>
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { WEEBUPLOADFILE, UPLOADFILE } from "@/api/file";

const fileList = reactive([]);
const uploadUrl = "http://127.0.0.1:8888/ichatgpt/api/v1/file/upload"; // 替换为你的上传接口地址

const handleUploadChange = (info) => {
  fileList.value = info[0].file;
};

const beforeUpload = (file) => {
  // 这里可以添加文件类型、大小等校验逻辑
  const isLt2G = file.size / 1024 / 1024 / 1024 < 2;
  if (!isLt2G) {
    Message.error("文件大小不能超过 2GB!");
    return false;
  }
  return true;
};

let data = reactive({
  file_path: "file",
  file_name: "finetuning.jsonl",
  purpose: "fine-tune",
});

const uploadFiles = async () => {
  try {
    let webResp = await WEEBUPLOADFILE(fileList.value);
    if (webResp.ok) {
      let resp = await UPLOADFILE(data);
      if (resp.code === 200) {
        Message.info("上传文件成功!");
      } else {
        Message.error("上传文件失败!");
      }
    } else {
      Message.error("上传文件失败!");
    }
  } catch (err) {
    Message.error(err);
    console.log(err);
  }
};
</script>

<style scoped lang="less"></style>
