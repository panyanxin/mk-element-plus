import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from "@element-plus/icons-vue"
import { toLine } from './utils'
// import mUI from './components'
// import mUI from '../lib/pyx-element-comp.es'
import mUI from '../lib/index.es'
import './../lib/style.css'
import './mock'

const app = createApp(App)

// 全局注册图标 牺牲一点性能
// el-icon-xxx
for (let i in Icons) {
  // console.log(toLine(i));
  // 注册全部组件
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

// 单个引入
// import chooseIcon from '../lib/chooseIcon/index.es'
// import '../lib/chooseIcon/style.css'
app.use(router)
   .use(ElementPlus)
  //  .use(chooseIcon)
   .use(mUI)

app.mount('#app')
