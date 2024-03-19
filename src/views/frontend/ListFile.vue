<template>
  <h1>文件列表</h1>
  <br />
  <a-table :columns="columns" :data="data" />
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { LISTFILE } from "@/api/file";

let data = reactive([]);

const columns = [
  {
    title: "文件id",
    dataIndex: "id",
  },
  {
    title: "文件大小(byte)",
    dataIndex: "bytes",
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
  },
  {
    title: "文件名",
    dataIndex: "filename",
  },
  {
    title: "对象类型",
    dataIndex: "object",
  },
  {
    title: "用途",
    dataIndex: "purpose",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "状态详情",
    dataIndex: "status_details",
  },
];
onMounted(async () => {
  try {
    let resp = await LISTFILE();
    if (resp.code === 200) {
      let arrData = resp.data.files;
      for (var i = 0; i < arrData.length; i++) {
        let item = {
          id: arrData[i].id,
          bytes: arrData[i].bytes,
          created_at: arrData[i].created_at,
          filename: arrData[i].filename,
          purpose: arrData[i].purpose,
          status: arrData[i].status,
          status_details: arrData[i].status_details,
        };
        data.push(item);
      }
    } else {
      Message.error("获取文件列表失败!");
    }
  } catch (err) {
    Message.error(err);
  }
});
</script>

<style scoped lang="less"></style>
