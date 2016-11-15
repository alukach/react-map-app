import { injectReducer } from 'store/reducers'
import { epic$ } from 'store/epics'

export default (store) => ({
  path: 'map',
  getComponent (nextState, next) {
    require.ensure([
      './containers/MapContainer',
      './modules/reducer',
    ], (require) => {
      const MapContainer = require('./containers/MapContainer').default
      const reducer = require('./modules/reducer').default
      const epics = require('./modules/epics').default

      injectReducer(store, {
        key: 'map',
        reducer: reducer,
      })

      for (let epic of epics) {
        epic$.next(epic)
      }

      next(null, MapContainer)
    }, 'map')
  }
})
