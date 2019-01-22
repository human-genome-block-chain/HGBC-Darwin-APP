import { postRequest } from 'util/fetch'

export const doDailyBouns = () => postRequest('/task/dailybouns/doDailyBouns.shtml')
export const readRecord = () => postRequest('/task/readRecord.shtml')
export const getInviteData = () => postRequest('/popularize/getInviteData.shtml')
export const bindingInvitation = investCode => postRequest('/account/boundInvest.shtml', { investCode })
