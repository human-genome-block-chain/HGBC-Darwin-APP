import * as Types from 'actions/actionsTypes'

const initialState = {
  password: '',
  tradePass: '',
  code: '',
	walletAddress: '',
  amount: 0
}

export default home = (state = initialState, action) => {
	switch (action.type) {
    case Types.TRADE_PWD:
			return { ...state, ...action.data }
		default:
			return state
	}
}