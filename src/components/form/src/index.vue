<template>
  <el-form 
    :model="model" 
    :rules="rules" 
    v-bind="$attrs"
    :validate-on-rule-change="false"
  >
    <el-form-item 
      v-for="(item, index) in options"
      :key="index"
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
let model = ref<any>({})
let rules = ref<any>({})

// 初始化表单
let initForm = () => {
  let m: any = {}
  let r: any = {}
  props.options!.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

onMounted(() => {
  initForm()
})
</script>

<style scoped>

</style>