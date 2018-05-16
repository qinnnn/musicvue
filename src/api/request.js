import Vue from 'vue'
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Cache-Control': 'max-age=0',
    // 'If-Range':'721afd4a7448bfcf7aafedf6eae1f218',
    'Range':'bytes=0-',
    'Upgrade-Insecure-Requests': '1'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  // config.headers['token'] = Vue.cookie.get('token')
  return config
}, error => {
  return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) {
    console.log("401")
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default service
