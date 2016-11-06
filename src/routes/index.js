 // We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Counter').default(store),
        require('./Map').default(store),
        require('./Zen').default(store),
        // require('./NotFound').default,
      ])
    })
  }
})

export default createRoutes
