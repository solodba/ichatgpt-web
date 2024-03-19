<template>
  <h1>model列表</h1>
  <br />
  <a-table :columns="columns" :data="data" />
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { LISTMODEL } from "@/api/model";
let data = reactive([]);
const columns = [
  {
    title: "模型名称",
    dataIndex: "id",
  },
  {
    title: "创建时间",
    dataIndex: "created",
  },
  {
    title: "对象类型",
    dataIndex: "object",
  },
  {
    title: "所属者",
    dataIndex: "owned_by",
  },
];
onMounted(async () => {
  try {
    let resp = await LISTMODEL();
    if (resp.code === 200) {
      let arrData = resp.data.list_models;
      for (var i = 0; i < arrData.length; i++) {
        let item = {
          id: arrData[i].id,
          created: arrData[i].created,
          object: arrData[i].object,
          owned_by: arrData[i].owned_by,
        };
        data.push(item);
      }
    } else {
      Message.error("获取模型列表失败!");
    }
  } catch (err) {
    Message.error(err);
  }
});
</script>

<style scoped lang="less"></style>
