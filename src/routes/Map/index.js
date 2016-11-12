import { injectReducer } from 'store/reducers'
import { epic$ } from 'store/epics'

export default (store) => ({
  path: 'map',
  getComponent (nextState, next) {
    require.ensure([
      './containers/MapContainer',
      './modules/reducer',
      './modules/actions',
    ], (require) => {
      const MapContainer = require('./containers/MapContainer').default
      const reducer = require('./modules/reducer')
      const actions = require('./modules/actions').default

      injectReducer(store, {
        key: 'map',
        reducer: reducer.default,
      })

      epic$.next(reducer.searchMapEpic)

      next(null, MapContainer)
    }, 'map')
  }
})
