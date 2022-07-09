<template>
  <div>
    <m-table 
      :data="tableData" 
      :options="options"
      elementLoadingText="加载中..."
      elementLoadingBackground="rgba(0,0,0,.8)"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="small">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
      <!-- <template #cellEdit="{ scope }">
        <el-button size="small" type="primary">确认</el-button>
      </template> -->
      <template #action="scope">
        <el-button size="small" type="primary" @click="edit(scope.scope)">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </m-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TableOptions } from '../../components/table/src/types';

let options: TableOptions[] = [
  {
    prop: 'date',
    label: '日期',
    // width: '180',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    prop: 'name',
    label: '姓名',
    // width: '180',
    align: 'center',
    slot: 'name'
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
    editable: true
  },
  {
    label: '操作',
    action: true,
    align: 'center'
  }
]

const tableData = ref<any[]>([])
setTimeout(() => {
  tableData.value = [
    {
      date: '2016-05-03',
      name: 'Tom1',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom2',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom3',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom4',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
}, 500)
let svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`
let edit = (scope: any) => {
  console.log(scope)
  // editRowIndex.value = 'edit'
}
</script>

<style scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>