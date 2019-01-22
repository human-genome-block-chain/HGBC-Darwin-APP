import { postRequest } from 'util/fetch'

export const getMessageNotification = () => postRequest('/task/getMessageNotification.shtml')
export const addMessageRecord = nid => postRequest('/task/addMessageRecord.shtml', { nid }, false)

