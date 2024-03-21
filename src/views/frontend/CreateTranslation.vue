<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <h1>上传语音文件</h1>
    <div>
      <a-upload
        :action="uploadMp3Url"
        :before-upload="beforeUpload"
        :file-list="fileList"
        @change="handleUploadChange"
      >
        <a-button> <a-icon type="upload" /> 选择文件 </a-button>
      </a-upload>
      <a-button type="primary" @click="uploadFiles">上传</a-button>
    </div>
    <div>
      <h1>语音翻译成英文</h1>
      <a-button type="primary" @click="translation">翻译</a-button>
      <h3>输出结果:</h3>
      <a-mention
        v-model="outputText"
        :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
        type="textarea"
        placeholder=""
      />
    </div>
  </a-space>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { WEBUPLOADMP3FILE } from "@/api/file";
import { CREATTRANSLATION } from "@/api/audio";

const fileList = reactive([]);
const uploadMp3Url = "http://127.0.0.1:8888/ichatgpt/api/v1/file/upload/audio"; // 替换为你的上传接口地址

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

const uploadFiles = async () => {
  try {
    let webResp = await WEBUPLOADMP3FILE(fileList.value);
    if (webResp.ok) {
      Message.info("上传文件成功!");
    } else {
      Message.error("上传文件失败!");
    }
  } catch (err) {
    Message.error(err);
    console.log(err);
  }
};

let data = reactive({
  model: "whisper-1",
  file_path: "file",
  file_name: "voice.mp3",
});

let outputText = ref("");

const translation = async () => {
  try {
    let resp = await CREATTRANSLATION(data);
    if (resp.code === 200) {
      outputText.value = resp.data.text;
    } else {
      Message.error("获取聊天数据失败!");
    }
  } catch (err) {
    Message.error(err);
    console.log(err);
  }
};
</script>

<style scoped lang="less"></style>
