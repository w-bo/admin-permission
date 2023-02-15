import Axios from 'axios'
import router from '@/router'

const axios = Axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '' : '',
})

// resultful 风格
const actionMapping = {
  get: 'view',
  post: 'add',
  put: 'edit',
  delete: 'delete'
}

axios.interceptors.request.use(config => {
  console.log(config, config.url, config.method)
  // 判断非登录请求添加token
  if (config.url !== '/login') {
    config.headers.Authorization = sessionStorage.getItem('token')
    // 非权限内请求进行拦截掉
    const actions = router.currentRoute.meta
    const reqAction = actionMapping[config.method]
    if (actions && actions.indexOf(reqAction) === -1) {
      alert('没有权限！')
      return Promise.reject(new Error('没有权限！'))
    }
  }
  return config
})

axios.interceptors.response.use(config => {
  // 用户长时间未操作，token 失效后进行接口请求，会返回 401 状态码
  // 应返回登录页面，清空数据
  if (config.status === 401) {
    router.push('/login')
    sessionStorage.clear()
    window.location.reload()
  }
  return config
})

export default (url, method = 'get', data = {}) => {
  return axios({
    url,
    method,
    data
  })
}