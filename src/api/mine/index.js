import { postRequest } from 'util/fetch'

export const getUserInfo = () => postRequest('/account/getUserIntroduction.shtml')
export const getSampleStatus = data => postRequest('/sample/getSampleStatus.shtml', { ...data })
export const getSettings = () => postRequest('/account/getAccountInformation.shtml')
export const sendFeedback = advise => postRequest('/feedback.shtml', { advise })
