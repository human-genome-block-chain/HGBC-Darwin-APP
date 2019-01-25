import { postRequest } from 'util/fetch'

export const addPacket = data => postRequest('/order/addPacket.shtml', { ...data })