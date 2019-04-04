import * as Types from 'actions/actionsTypes'

const initialState = {
	power_count: 0,
  token_count: 0,
  tasks: {}
}

export default home = (state = initialState, action) => {
	switch (action.type) {
    case Types.SET_DATA:
			return { ...state, ...action.data }
		case Types.SET_POWER:
			return { ...state, power_count: (state.power_count + action.power) }
    case Types.SET_TOKEN:
			return { ...state, token_count: (state.token_count + action.token) }
		case Types.DELETE_TOKEN:
			return { ...state, token_count: (state.token_count - action.token) }
		default:
			return state
	}
}