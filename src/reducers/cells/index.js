import * as Types from 'actions/actionsTypes'

const initialState = {
	count: 0,
  item: [],
  isRemain: false,
	isEmpty: false
}

export default cells = (state = initialState, action) => {
	switch (action.type) {
    case Types.SET_CELLS:
			return { ...state, ...action.data }
    case Types.SET_REMAIN:
			return { ...state, isRemain: action.isRemain }
		case Types.SET_EMPTY:
			return { ...state, isEmpty: action.isEmpty }
		default:
			return state
	}
}