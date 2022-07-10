const path = require('path')
const { defineConfig, build} = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 出口文件
const outputDir = path.resolve(__dirname, '../lib')
// vite 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
// rollup 配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

//全量构建
const buildAll = async () => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'pyx-element-comp',
        fileName: 'pyx-element-comp',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  }))
}

// 打包成库
const buildLib = async () => {
  await buildAll()
}

buildLib()