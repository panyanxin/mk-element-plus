<template>
  <div>
    <!-- <m-notification :value="50">123</m-notification>
    <br />
    <br />
    <m-notification :value="50" :max="30"></m-notification>
    <br />
    <br />
    <m-notification :value="50" isDot></m-notification>
    <br /> -->
    <m-notification :value="50">
      <template #default>
        <m-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></m-list>
      </template>
    </m-notification>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from './data'

let clickItem = (val: any) => {
  console.log(val)
}
let clickAction = (val: any) => {
  console.log(val)
}
</script>

<style scoped>

</style>