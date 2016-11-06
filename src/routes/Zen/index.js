import { injectReducer } from '../../store/reducers'
import { injectEpic } from '../../store/epics'

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
      const actions = require('./modules/zen.actions').default

      injectReducer(store, {
        key: 'zen',
        reducer: zenReducer
      })

      injectEpic(store, {
        key: 'zen',
        epic: actions.fetchZenEpic
      })

      next(null, Zen)
    })
  }
})