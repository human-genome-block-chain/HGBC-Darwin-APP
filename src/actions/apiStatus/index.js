import * as Types from '../actionsTypes';

// 开启loading
export const loadingOpen = () => ({
	type: Types.LOAD_OPEN
})

// 关闭loading
export const loadingClose = () => ({
	type: Types.LOAD_CLOSE
})