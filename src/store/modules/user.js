import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth' // 单引号引文件
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置token为共享状态,初始化vuex时，先从缓存中读
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex数据置空
    removeToken() // 同步到缓存
  },
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result // 是响应式 state.userInfo = {...result}
  },
  removeUserInfo(state) {
    // 删除用户
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
    setTimeStamp() // 设置当前时间戳
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情数据
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到mutations
    return result // 做权限时会用到
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
