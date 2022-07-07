<template>
  <div>
    <m-choose-time :startOptions="startOptions" @startChange="startChange" @endChange="endChange"></m-choose-time>
    <br />
    <br />
    <!--  @startChange="dateStartChange" @endChange="dateEndChange" -->
    <m-choose-date :startOptions="startOptions" :disableToday="false" ></m-choose-date>
  </div>
</template>

<script setup lang="ts">
interface endValue {
  startTime: string,
  endTime: string
}
interface dateEndValue {
  startDate: Date,
  endDate: Date
}

let startChange = (val: string) => {
  console.log('startChange', val)
}
let endChange = (val: endValue) => {
  console.log('endChange', val)
}

let startOptions = {
  // size: 'mini',
  // clearable: false
}
</script>

<style scoped>

</style>