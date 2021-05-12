import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
axios.defaults.withCredentials = true // 让ajax携带cookie
//axios.defaults.baseURL = 'https://124.70.87.28:8000/';
axios.defaults.baseURL = 'https://127.0.0.1:8081/';
//设置全局axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {   //解决前端发送数据格式要为form-data的问题自动把data转为form形式
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

createApp(App).use(router).mount('#app')


