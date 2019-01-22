import * as Types from 'actions/actionsTypes'

const initialState = {
	isLoading: false
}

export default userInfo = (state = initialState, action) => {
	switch (action.type) {
    case Types.LOAD_OPEN:
			return { ...state, isLoading: true }
		case Types.LOAD_CLOSE:
			return { ...state, isLoading: false }
		default:
			return state
	}
}