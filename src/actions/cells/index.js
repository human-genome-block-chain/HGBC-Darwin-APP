import * as Types from '../actionsTypes';

export const setCells = data => ({
	type: Types.SET_CELLS,
  data
})

export const nextCells = count => ({
	type: Types.SET_NEXT,
  count
})

export const setCellRemain = isRemain => ({
	type: Types.SET_REMAIN,
  isRemain
})