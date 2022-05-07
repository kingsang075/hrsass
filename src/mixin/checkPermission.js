import store from '@/store'

// 做一个混入对象
export default {
  methods: {
    checkPermission(key) {
      // 用户信息里面找points中有没有key
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item.name === key)
      }
      return false // 如果没进入if,说明没权限直接返回false
    }
  }
}
