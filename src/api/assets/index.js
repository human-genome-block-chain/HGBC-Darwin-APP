import { postRequest } from 'util/fetch'

export const getReward = () => postRequest('/bubble/getReward.shtml')
export const getTaskListState = () => postRequest('/task/getTaskBox.shtml')
export const getTokenAndPower = () => postRequest('/account/getTokenAndPower.shtml')
export const fireReward = bubbleId => postRequest('/bubble/fireReward.shtml', { bubbleId }, false)
export const getPowerKing = () => postRequest('/power/getPowerKing.shtml')
export const getTokenLog = data => postRequest('/token/getTokenLog.shtml', { ...data }, false)
export const getPowerLog = data => postRequest('/power/getPowerLog.shtml', { ...data }, false)
export const getDataInfo = () => postRequest('/account/getDataInfo.shtml') // 数据资产统计
export const getBaseInfoAssets = () => postRequest('/account/getBaseInfo.shtml') // 基本信息
export const getSampleInfo = data => postRequest('/account/getSampleInfo.shtml', { ...data }, false) // 组数据详情
export const getLinkTokenAuth = data => postRequest('/account/getLinkTokenAuth.shtml', { ...data }, false) // 链克口袋签名请求地址
export const dataSignState = data => postRequest('/account/dataSignState.shtml', { ...data }, false)

//获取分享图片
export const getShareImage = data => postRequest('/account/getShareImage.shtml', { ...data })
//验证码
export const sendPhoneCode = data => postRequest('/account/sendPhoneCode.shtml', { ...data })
