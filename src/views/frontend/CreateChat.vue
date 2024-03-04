<template>
  <a-space direction="vertical" size="large" style="width: 100%">
    <h1>机器人问答</h1>
    <h3>输入提问:</h3>
    <a-mention
      v-model="text"
      :data="['Bytedance', 'Bytedesign', 'Bytenumner']"
      type="textarea"
      placeholder="enter something"
    />
    <a-button type="primary" @click="handleSubmit">提交</a-button>
    <h3>输出答案:</h3>
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

let text = ref("");
let outputText = ref("");

let data = reactive({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: text,
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
