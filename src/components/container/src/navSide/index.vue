<template>
  <el-menu
        :collapse="collapse"
        default-active="2"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="2">
          <el-icon-menu></el-icon-menu>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon-menu></el-icon-menu>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon-menu></el-icon-menu>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
</template>

<script setup lang="ts">
let props = defineProps<{
  collapse: boolean
}>()
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>