import { combineEpics } from 'redux-observable'

export const makeRootEpic = (asyncEpics) => {
  return combineEpics({
    ...asyncEpics
  })
}

export const injectEpic = (store, { key, epic }) => {
  store.asyncEpics[key] = epic
  store.replaceEpic(makeRootEpic(store.asyncEpics))
}

export default makeRootEpic
