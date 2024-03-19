<template>
  <div class="login-form">
    <h2>模型微调</h2>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item
        field="name"
        tooltip="Please enter your model name"
        label="模型名称"
      >
        <a-input
          v-model="form.name"
          placeholder="please enter your model name..."
        />
      </a-form-item>
      <a-form-item field="fileid" label="训练文件">
        <a-input
          v-model="form.fileid"
          placeholder="please enter your training file..."
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" style="background-color: blue; color: red"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { CREATEFUNETINE } from "@/api/finetune";
import { Message } from "@arco-design/web-vue";

const form = reactive({
  name: "",
  fileid: "",
});

let param = reactive({
  model: "",
  training_file: "",
});

const handleSubmit = async (data) => {
  try {
    param.model = data.values.name;
    param.training_file = data.values.fileid;
    let resp = await CREATEFUNETINE(param);
    if (resp.code === 200) {
      Message.info("创建微调任务成功!");
    } else {
      Message.error("创建微调任务失败!");
    }
  } catch (err) {
    Message.error(err);
  }
};
</script>

<style scoped lang="less"></style>
