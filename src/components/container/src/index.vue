<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="isCollapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavSide from './navSide/index.vue'
import NavHeader from './navHeader/index.vue'
let isCollapse = ref(false);

let toggle = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>