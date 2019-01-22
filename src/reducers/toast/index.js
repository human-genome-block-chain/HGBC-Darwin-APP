import * as Types from 'actions/actionsTypes'

const initialState = {
	msg: '',
	count: 0
}

export default home = (state = initialState, action) => {
	switch (action.type) {
    case Types.SET_MSG:
			return { ...state, msg: action.text, count: ++state.count}
		default:
			return state
	}
}