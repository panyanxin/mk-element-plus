<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="!collapse" style="margin-right: 10px"></el-icon-expand>
      <el-icon-fold v-else style="margin-right: 10px"></el-icon-fold>
    </span>
  </div>
</template>

<script setup lang="ts">
let props = defineProps<{
  collapse: boolean
}>()
let emits = defineEmits(['update:collapse'])
let toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style scoped lang="scss">
.header{
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  svg{
    cursor: pointer;
  }
}
</style>