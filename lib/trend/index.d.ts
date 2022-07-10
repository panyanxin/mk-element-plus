// 告诉使用我们当前组件库的项目
// 我们这个组件是一个vue插件

import {App} from 'vue'
declare const _default: {
  install(app:App): void
}

export default _default