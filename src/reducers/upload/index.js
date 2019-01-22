import * as Types from 'actions/actionsTypes'

const initialState = {
	newState: 1,
	newInformation: 4,
	newVersion: 0,
	newVersionName: '',
	newUrl: ''
}

export default upload = (state = initialState, action) => {
	switch (action.type) {
    case Types.SET_UPDATA:
			return { ...state, ...action.data}
		default:
			return state
	}
}