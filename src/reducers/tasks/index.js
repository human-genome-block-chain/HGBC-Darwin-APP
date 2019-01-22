import * as Types from 'actions/actionsTypes'

const initialState = {
  WGS: { 
    scode: '',
    simpleCount: 0
  },
  WES: { 
    scode: '',
    simpleCount: 0
  },
  daily_bonus: {
    enable: "0", 
    is_finish: "1"
  },
  invite: {
    inviteCount: 0
  },
  popularize: {
    inviteBoundCount: 0
  },
  strategy: {
    is_finish : 1
  },
  investcode: ' ',
  inviteCount: 0,
  powerSum: 0,
  boundSampleCount: 0,
  data: 'http://m.hgbc.io/',
  username: '',
  boundInvitationCode: {
    is_finish: 1
  },
  baseinfo: {
    is_finish: 1
  }
}

export default tasks = (state = initialState, action) => {
	switch (action.type) {
    case Types.SET_TASKS:
			return { ...state, ...action.tasks }
		default:
			return state
	}
}