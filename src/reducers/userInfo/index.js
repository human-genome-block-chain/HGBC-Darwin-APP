import * as Types from 'actions/actionsTypes'

const initialState = {
	version: '10',
	imei: '',
	token: '',
	phone: '',
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
