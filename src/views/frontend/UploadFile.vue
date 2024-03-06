<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <h1>文件上传</h1>
    <a-upload
      :file-list="form.maininformation"
      :action="Activity"
      @success="UploadFile"
    />
  </a-space>
</template>

<script setup>
function UploadFile(fileItem) {
  console.log(fileItem.response.data);
  // form.value.maininformation.push(fileItem.response.data);
  // console.log(form.value.maininformation);
}
</script>

<style scoped lang="less"></style>
