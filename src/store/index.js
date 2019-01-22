import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from 'reducers/index'

import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore)

export default createStoreWithMiddleware(reducers)
