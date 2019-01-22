import { combineReducers } from 'redux'

// 导航部分
import nav from './navigation/index'
// 用户数据部分
import userInfo from './userInfo/index'
// 请求部分
import apiStatus from './apiStatus/index'
// 小球部分
import cells from './cells/index'
// 首页部分
import home from './home/index'
// toast部分
import toast from './toast/index'
// 重置密码部分
import resetPwd from './resetPwd/index'
// 任务部分
import tasks from './tasks/index'
// 跟新部分
import upload from './upload/index'
// 设置交易密码
import tradePwd from './tradePwd/index'


export default combineReducers({
	nav,
	userInfo,
	apiStatus,
	cells,
	home,
	toast,
	resetPwd,
	tasks,
	upload,
	tradePwd
})