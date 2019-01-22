import { postRequest } from 'util/fetch'

export const getStoreList = filter => postRequest('/applet/getStoreList.shtml', { filter })
export const getAppletInfo = appid => postRequest('/applet/getAppletInfo.shtml', { appid })
export const getAppletState = appid => postRequest('/applet/getAppletState.shtml', { appid })
export const buyApplet = data => postRequest('/applet/buyApplet.shtml', { ...data })
export const getAppletBanners = () => postRequest('/applet/getAppletBanners.shtml')
