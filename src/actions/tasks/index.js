import * as Types from '../actionsTypes';

export const setTasks = tasks => ({
	type: Types.SET_TASKS,
  tasks
})

export const setRemain = isRemain => ({
	type: Types.SET_REMAIN,
  isRemain
})

export const setEmpty = isEmpty => ({
	type: Types.SET_EMPTY,
  isEmpty
})
