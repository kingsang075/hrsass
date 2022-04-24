import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
const TimeOut = 3600 // 定义超时时间

const service = axios.create({
  // 当执行npm run dev => .env.devlopment => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // 开发环境: /api, 生产环境: /prod-api
  timeout: 5000 // 5秒超时
})
// 请求拦截器
service.interceptors.request.use(config => {
  // config是请求的配置信息
  // 注入token
  if (store.getters.token) {
    // 只有在有token情况下，才有必要检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果为true，过期了
      // token没用了，因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登陆页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认放了一层data
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    // 业务已经错误应该进catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // error 信息 里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)
})
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
