import { postRequest } from 'util/fetch'

export const boundSample = code => postRequest('/sample/boundSample.shtml', {code})
export const getInvitationQrCode = code => postRequest('/sample/getInvitationQrCode.shtml', {code})
