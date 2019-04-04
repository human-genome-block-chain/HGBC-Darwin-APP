import qs from 'qs'
import path_join from './pash_join'
import * as Status from './errorCode'
import { removeStorage } from 'storage/index'
import {
	logout,
	loadingOpen,
	loadingClose,
	setToastMsg,
	setUserInfo
} from 'actions/index'

let count = 0
let time = 0
let timer = null
let timeOutTimer = null

// 线上地址https
// const SERVER_BASE = 'https://app.hgbc.io:443/mobile'

// 开发地址
const SERVER_BASE = 'http://192.168.1.116:8080/mobile'


/**
 * 数据请求生成器
 * @method http_factory
 * @for 所属类名
 * @param {string} method 请求类型
 * @return func
 * 	@param {string} url 请求类型
 * 	@param {object} params 请求参数
 * 	@param {bool} isLoading 是否开启loading
 */

const http_factory = method => (url, params = {}, isLoading = true) => {
	url = path_join(SERVER_BASE, url)

	let userInfo = global.store.getState().userInfo

	let headers = {
		version: userInfo.version,
		imei: userInfo.imei,
		token: userInfo.token
	}

	const options = {
		method,
		headers
	}

	if (method === 'GET') {
		const query = qs.stringify(params)

		if (query) url += `?${query}`
	} else {
		if (JSON.stringify(params) !== '{}') {
			let formData = new FormData()

			for ( let key in params ) formData.append(key, params[key])

			options.body = formData
		}
	}

	return new Promise ((resolve, reject) => {
		clearTimeout(timeOutTimer)

		if (count <= 0) {
			time = new Date().getTime()
			isLoading && global.store.dispatch(loadingOpen())
		}

		isLoading && count++

		timeOutTimer = setTimeout(() => {
			const msg = '亲，网络不给力啊'

			clearTimeout(timeOutTimer)
			global.store.dispatch(loadingClose())
			global.store.dispatch(setToastMsg(msg))
			reject(msg)
		}, 60000)

		fetch(url, options)
		.then(response => response.json())
		.catch((e) => {
			return { message: '亲，没网了o(╥﹏╥)o' }
		})
		.then(data => {
			console.log('返回',data)
			isLoading && count--
			clearTimeout(timeOutTimer)

			if (count <= 0) {
				let now = new Date().getTime()

				if (now - time  < 400) {
					clearTimeout(timer)
					timer = setTimeout(() => global.store.dispatch(loadingClose()) , 400)
				} else {
					global.store.dispatch(loadingClose())
				}
			}

			if (data.error_code === Status.SUCCESS_CODE) {
				resolve(data)
			} else if (data.error_code === Status.FAILURE_TOKEN) {
				removeStorage('token').then(() => {
					global.store.dispatch(setUserInfo({ phone: '',token: '',uid: '' }))
				})

				global.store.dispatch(logout())
			} else {
				let msg = data.message || '错误，请稍后再试'
				if (count <= 0) global.store.dispatch(setToastMsg(msg))
				reject(msg)
			}
		})
	})
}

const getRequest = http_factory('GET')
const postRequest = http_factory('POST')

export {
	getRequest,
	postRequest
}
