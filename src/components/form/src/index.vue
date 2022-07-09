<template>
  <el-form 
    ref="form"
    v-if="model"
    :model="model" 
    :rules="rules" 
    v-bind="$attrs"
    :validate-on-rule-change="false"
  >
    <template
      v-for="(item, index) in options"
      :key="index"
    >
      <el-form-item 
        v-if="!item.children || !item.children!.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component 
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder" 
          :is="`el-${item.type}`"
        ></component>
        <el-upload
          v-else-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
        <div id="editor" v-else-if="item.type === 'editor'"></div>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          ></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action"  :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType,ref, onMounted, watch, nextTick } from 'vue';
import { FormInstance, FormOptions } from './types/types';
import E from "wangeditor"

import cloneDeep from 'lodash/cloneDeep'

let emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    require: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  }
})
let model = ref<any>(null)
let rules = ref<any>(null)
let form = ref<FormInstance | null>()
let edit = ref()

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}
    props.options!.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      if (item.type === 'editor') {
        // 初始化富文本
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            editor.create()
            // 初始化富文本的内容
            editor.txt.html(item.value)
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop!] = newHtml
            }
            edit.value = editor
          }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 重置表单
let resetFields = () => {
  // 重置element-plus的表单
  form.value!.resetFields()
  // 重置富文本编辑器的内容
    // 获取到富文本的配置项
  if (props.options && props.options.length) {
    let editorItem = props.options.find(item => item.type === 'editor')!
    edit.value.txt.html(editorItem.value)
  }
}

// 分发方法
defineExpose({
  resetFields,
  // validate,
  // getFormData
})

onMounted(() => {
  initForm()
})

// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options!.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList, })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}

</script>

<style scoped>

</style>