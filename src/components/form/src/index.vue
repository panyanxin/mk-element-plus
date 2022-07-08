<template>
  <el-form 
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
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder" 
          :is="`el-${item.type}`"
        ></component>
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
  </el-form>
</template>

<script setup lang="ts">
import { PropType,ref, onMounted, watch, nextTick } from 'vue';
import { FormOptions } from './types/types';

import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    require: true
  }
})
let model = ref<any>(null)
let rules = ref<any>(null)

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}
    props.options!.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

onMounted(() => {
  initForm()
})
</script>

<style scoped>

</style>