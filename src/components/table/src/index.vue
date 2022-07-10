<template>
  <el-table 
    :data="data"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick"
  >
    <template 
      v-for="(item, index) in tableOption" 
      :key="index"
    >
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
          </template>
          <template v-else>
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div style="display: flex">
                <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                <div>
                  <slot name="cellEdit" v-if="$slots.cellEdit" :scope="scope"></slot>
                  <div class="action-icon" v-else>
                    <el-icon-check class="check" @click.stop="check(scope)"></el-icon-check>
                    <el-icon-close class="close" @click.stop="close(scope)"></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <component
                :is="`el-icon-${toLine(editIcon)}`"
                class="edit"
                v-if="item.editable"
                @click.stop="clickEditIcon(scope)"
              ></component>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="actionOption!.label"
      :width="actionOption!.width"
      :align="actionOption!.align"
    >
      <template #default="scope">
        <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref, watch } from 'vue';
import { TableOptions } from './types';
import { toLine } from '../../../utils'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  // 表格配置选项
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  // 表格数据
  data: {
    type: Array,
    required: true
  },
  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String,
  },
  // 加载背景颜色
  elementLoadingBackground: {
    type: String,
  },
  // 加载图标是svg
  elementLoadingSvg: {
    type: String
  },
  // 加载团是svg的配置
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 编辑显示的图标
  editIcon: {
    type: String,
    default: 'Edit'
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: ''
  },
})

let emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'size-change', 'current-change'])

// 过滤操作项之后的配置
let tableOption = computed(() => props.options.filter(item => !item.action))
// 操作项
let actionOption = computed(() => props.options.find(item => item.action))
// 是否在加载中
let isLoading = computed(() => !props.data || !props.data.length)

// 当前被点击的单元格的标识
let currentEdit = ref<string>('')
// 拷贝一份表格的数据
let tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝一份按钮的标识
let cloneEditRowIndex = ref<string>(props.editRowIndex)
// 监听的标识
let watchData = ref<boolean>(false)

// 如果data的数据变了 要重新给tableData赋值
// 只需要监听一次就可以了
let stopWatchData =  watch(() => props.data, val => {
  watchData.value = true
  tableData.value = val
  tableData.value.map(item => {
    item.rowEdit = false
  })
  if (watchData.value) stopWatchData()
}, { deep: true })

// 监听
watch(() => props.editRowIndex, val => {
  if (val) cloneEditRowIndex.value = val
})

onMounted(() => {
  tableData.value.map(item => {
    item.rowEdit = false
  })
})

// 点击行的事件
let rowClick = (row: any, column: any) => {
  // 判断是否是点击的操作项
  if (column.label === actionOption.value!.label) {
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      // 编辑行的操作
      row.rowEdit = !row.rowEdit
      // 重置其他数据的rowEdit
      tableData.value.map(item => {
        if (item !== row) item.rowEdit = false
      })
      // 重置按钮的标识
      if (!row.rowEdit) emits('update:editRowIndex', '')
    }
  }
}

// 点击编辑图标
let clickEditIcon = (scope: any) => {
  // console.log(scope);
  // 会做一个判断 判断是否当前单元格被点击了
  // 拼接$index和column的id
  currentEdit.value = scope.$index + scope.column.id
  // console.log(currentEdit.value)
}

// 点击确认
let check = (scope: any) => {
  emits('confirm', scope)
  currentEdit.value = ''
}
// 点击取消
let close = (scope: any) => {
  emits('cancel', scope)
  currentEdit.value = ''
}

</script>

<style lang='scss' scoped>
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 12px;
  cursor: pointer;
}
.action-icon {
  display: flex;
  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    position: relative;
    top: 8px;
    cursor: pointer;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
.pagination {
  margin-top: 16px;
  display: flex;
}
</style>