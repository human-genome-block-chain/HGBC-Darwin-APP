import { postRequest } from 'util/fetch'

export const baseInfo = data => postRequest('/account/baseInfo.shtml', { ...data })
export const getBaseInfo = data => postRequest('/applet/getBaseInfo.shtml', { ...data })