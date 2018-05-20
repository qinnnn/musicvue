import Vue from 'vue'
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Accept': '*',
    // 'If-Range':'721afd4a7448bfcf7aafedf6eae1f218',
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
