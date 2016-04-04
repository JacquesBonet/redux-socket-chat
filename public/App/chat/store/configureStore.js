import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers'
import {socketMiddleware} from '../middleware/socketEvents'

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    reducers,
    { chat: null},
    applyMiddleware(thunkMiddleware, loggerMiddleware, socketMiddleware)
  )
}
