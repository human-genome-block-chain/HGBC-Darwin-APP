import * as Types from '../actionsTypes';

// 添加用户数据
export const setUserInfo = data => ({
	type: Types.SET_USER_INFO,
	data
})