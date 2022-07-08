<template>
  <m-choose-city @change="changeArea"></m-choose-city>
</template>

<script lang='ts' setup>

let changeArea = (val: any) => {
  console.log(val)
}
</script>

<style lang='scss' scoped>
</style>