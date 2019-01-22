import * as Types from 'actions/actionsTypes'

const initialState = {
	username: '',
  iphone: '',
  code: '' 
}

export default home = (state = initialState, action) => {
	switch (action.type) {
    case Types.RESET_DATA:
			return { ...state, ...action.data }
		default:
			return state
	}
}