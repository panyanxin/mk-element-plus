<template>
  <m-choose-area @change="changeArea"></m-choose-area>
</template>

<script lang='ts' setup>
// import mChooseArea from './../../components/chooseArea/src/index.vue'

let changeArea = (val: any) => {
  console.log(val)
}
</script>

<style lang='scss' scoped>
</style>