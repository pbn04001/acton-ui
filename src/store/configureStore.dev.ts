import { applyMiddleware, compose, createStore } from 'redux'
import { reduxSagaMiddleware, startSagas } from './sagas'
import rootReducer from './rootReducer'
import { getWindow } from '../utils/window'

export default function configureStore() {
  const sagaMiddleware = reduxSagaMiddleware()
  const middleware = [sagaMiddleware]

  // Redux Devtools
  const enhancers = compose(
    applyMiddleware(...middleware),
    getWindow('__REDUX_DEVTOOLS_EXTENSION__') ? getWindow('__REDUX_DEVTOOLS_EXTENSION__()') : null
  )

  const store = createStore(rootReducer, {}, enhancers)
  startSagas()

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
