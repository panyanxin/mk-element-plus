<template>
  <div>
    <m-form 
      ref="form"
      label-width="100px" 
      :options="formConfig"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button size="small" type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc;font-size: 12px;">jpg/png files with a size less than 500kb</div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </m-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormOptions } from '../../components/form/src/types/types';
import { ElMessage, ElMessageBox } from 'element-plus'
import {formConfig} from './form.config.js'
import { ref } from 'vue';


interface Scope {
  form: FormInstance,
  model: any
}

let form = ref()

let submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      console.log(scope.model)
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('表单填写有误,请检查')
    }
  })
}

// 重置表单
let resetForm = () => {
  form.value.resetFields()
}

let handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
let handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
let beforeRemove = (val: any) => {
  console.log('beforeRemove')
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
let handleExceed = (val: any) => {
  console.log('handleExceed', val)
  ElMessage.warning(
    `The limit is 3, you selected ${val.files.length
    } files this time, add up to ${val.files.length + val.fileList.length} totally`
  )
}
let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
let handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}
</script>

<style scoped>

</style>