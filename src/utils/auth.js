import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_ihrm_token' // 唯一的key
const timeKey = 'hrsaas-timestamp-key' // 唯一的
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}

