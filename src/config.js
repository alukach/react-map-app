export const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  mapboxApiToken: 'pk.eyJ1IjoiYWx1a2FjaCIsImEiOiJ3US1JLXJnIn0.xrpBHCwvzsX76YlO-08kjg',
  app: {
    title: 'El See Em',
    description: 'Just some LCMing',
    head: {
      titleTemplate: '%s | El See Em',
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}

export default config