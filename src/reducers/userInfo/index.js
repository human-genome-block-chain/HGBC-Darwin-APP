import * as Types from 'actions/actionsTypes'

const initialState = {
	version: '11',
	imei: '',
	token: '',
	phone: '',
	time: 0,
	phone_encrypt: '',
	is_bandWallet: 0,
	is_setTradePass: 0
}

export default userInfo = (state = initialState, action) => {
	switch (action.type) {
		case Types.SET_USER_INFO:
			return { ...state, ...action.data }
		default:
			return state
	}
}
