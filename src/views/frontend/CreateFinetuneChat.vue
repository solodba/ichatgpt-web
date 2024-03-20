<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <h1>测试微调模型</h1>
    <h4>system:</h4>
    <a-mention
      v-model="sysmsg"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="Your are a helpful assistant."
    />
    <h4>user:</h4>
    <a-mention
      v-model="usermsg"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="Enter a user message here."
    />
    <h4>输入自定义训练模型:</h4>
    <a-mention
      v-model="modelname"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="Enter your model name."
    />
    <a-button type="primary" @click="handleSubmit">提交</a-button>
    <h4>输出答案:</h4>
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
import { CREATECHAT } from "@/api/chat";

let sysmsg = ref("");
let usermsg = ref("");
let modelname = ref("");
let outputText = ref("");

let data = reactive({
  model: modelname,
  messages: [
    {
      role: "system",
      content: sysmsg,
    },
    {
      role: "user",
      content: usermsg,
    },
  ],
});

const handleSubmit = async () => {
  try {
    let resp = await CREATECHAT(data);
    if (resp.code === 200) {
      outputText.value = resp.data.choices[0].messages.content;
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
