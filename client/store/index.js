import {combineReducers, createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import {
  user
} from './reducers'

const logger = createLogger({
  collapsed: true
})
const middleware = composeWithDevTools(applyMiddleware(logger, thunk))

const reducers = combineReducers({
  user
})
const store = createStore(reducers, middleware)

export default store
export * from './user'
