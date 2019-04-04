import * as Types from '../actionsTypes';

export const setHomeData = data => ({
	type: Types.SET_DATA,
  data
})

export const setPower = power => ({
	type: Types.SET_POWER,
  power
})

export const setToken = token => ({
	type: Types.SET_TOKEN,
  token
})

export const deleteToken = token => ({
	type: Types.DELETE_TOKEN,
  token
})

