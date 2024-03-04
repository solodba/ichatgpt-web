<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <h1>图片生成</h1>
    <h3>描述信息:</h3>
    <a-mention
      v-model="text"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="enter something"
    />
    <a-button type="primary" @click="handleSubmit">提交</a-button>
    <h3>输出结果:</h3>
    <a-mention
      v-model="outputText"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder=""
    />
  </a-space>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { CREATEIMAGE } from "@/api/image";

let text = ref("");
let outputText = ref("");

let data = reactive({
  model: "dall-e-3",
  prompt: text,
});

const handleSubmit = async () => {
  try {
    let resp = await CREATEIMAGE(data);
    if (resp.code === 200) {
      outputText.value = resp.data.data[0].url;
    } else {
      Message.error("获取图片失败!");
    }
  } catch (err) {
    Message.error(err);
    console.log(err);
  }
};
</script>

<style scoped lang="less"></style>
