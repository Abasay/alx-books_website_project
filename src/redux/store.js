import { createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducerAction } from './reducers/authReducers'
// import { authReducer } from './reducers/authReducers'
// import { homeVideosReducer } from './reducers/videosReducer'

const rootReducer = combineReducers({
  auth: authReducerAction,
  // homeVideosReducer: homeVideosReducer,
})
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
