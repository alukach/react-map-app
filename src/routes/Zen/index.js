import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'zen',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ZenContainer',
      './modules/zen.reducer',
      './modules/zen.actions',
    ], (require) => {
      const Zen = require('./containers/ZenContainer').default
      const zenReducer = require('./modules/zen.reducer').default

      injectReducer(store, {
        key: 'zen',
        reducer: zenReducer
      })

      next(null, Zen)
    })
  }
})