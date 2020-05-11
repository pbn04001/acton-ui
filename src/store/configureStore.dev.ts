import { applyMiddleware, compose, createStore } from 'redux'
import { reduxSagaMiddleware, startSagas } from './sagas'
import rootReducer from './rootReducer'

export default function configureStore() {
  const sagaMiddleware = reduxSagaMiddleware()
  const middleware = [sagaMiddleware]

  // Redux Devtools
  const enhancers = compose(applyMiddleware(...middleware), window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__()'])

  const store = createStore(rootReducer, {}, enhancers)
  startSagas()

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
