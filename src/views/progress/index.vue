<template>
  <div>
    <m-progress isAnimate :percentage="60"></m-progress>
    <br />
    <m-progress isAnimate status="success" :stroke-width="20" :percentage="60"></m-progress>
    <br />
    <m-progress :time="5000" type="circle" isAnimate :percentage="60"></m-progress>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>