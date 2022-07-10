import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notification from './notification'
import list from './list'
import menu from './menu'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
import form from './form'
import modalForm from './modalForm'
import table from './table'
import calendar from './calendar'
import './styles/base.scss'
import './styles/element-ui.scss'

import * as Icons from "@element-plus/icons-vue"
import { toLine } from './utils'

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modalForm,
  table,
  calendar
]

export default {
  install(app: App) {
    // 全局注册图标 牺牲一点性能
    // el-icon-xxx
    for (let i in Icons) {
      // console.log(toLine(i));
      // 注册全部组件
      app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
    }
    components.map(item => {
      app.use(item)
    })
    
  }
}
