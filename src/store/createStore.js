import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import { persistStore, autoRehydrate } from 'redux-persist'

import makeRootReducer from './reducers'
import { updateLocation } from './location'
import { rootEpic } from './epics'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // https://github.com/redux-observable/redux-observable/blob/master/docs/basics/SettingUpTheMiddleware.md
  const epicMiddleware = createEpicMiddleware(rootEpic)

  const middleware = [
    thunk,
    epicMiddleware,
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
      ...enhancers
    )
  )
  store.asyncReducers = {}
  persistStore(store)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
    // https://redux-observable.js.org/docs/recipes/HotModuleReplacement.html
    // TODO: Send EPIC_END signal to kill all existing epics to prevent
    // duplicate listeners
    module.hot.accept('./epics', () => {
      const rootEpic = require('./epics').default
      epicMiddleware.replaceEpic(rootEpic)
    })
  }

  return store
}
