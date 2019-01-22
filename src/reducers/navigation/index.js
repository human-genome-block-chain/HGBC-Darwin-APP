import AppNavigator from 'router/index'
import { NavigationActions, StackActions } from 'react-navigation'

import * as Types from 'actions/actionsTypes'


const firstAction = AppNavigator.router.getActionForPathAndParams('Login')
const tempNavState = AppNavigator.router.getStateForAction(firstAction)
const lastAction = AppNavigator.router.getActionForPathAndParams('MainTab')
const tempNavState2 = AppNavigator.router.getStateForAction(lastAction)
const thirdAction = AppNavigator.router.getActionForPathAndParams('AuthLoading')

const initialNavState = AppNavigator.router.getStateForAction(
  thirdAction,
  tempNavState,
  tempNavState2
)

const inieState = { ...initialNavState, routerName: '' }

const nav = (state = inieState, action) => {
  let nextState

  switch (action.type) {
    case Types.TO_BACK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      )
      break
    case Types.TO_LOAGIN:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' })
          ]
        }),
        state
      )
      break
    case Types.LOAO_OUT:
      nextState = initialNavState
      break
    case Types.TO_MAIN:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainTab' })
          ]
        }),
        state
      )
      break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      if (action.routeName) nextState.routerName = action.routeName
      break
  }

  return nextState || state
}

export default nav
