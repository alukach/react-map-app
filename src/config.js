export const config = {
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
  mapboxApiToken: 'pk.eyJ1IjoiYWx1a2FjaCIsImEiOiJ3US1JLXJnIn0.xrpBHCwvzsX76YlO-08kjg',
  oauth: {
    apiUrl:                  'http://livingcitymap2.dev/api',
    signOutPath:             '/evil_user_auth/sign_out',
    emailSignInPath:         '/evil_user_auth/sign_in',
    emailRegistrationPath:   '/evil_user_auth',
    accountUpdatePath:       '/evil_user_auth',
    accountDeletePath:       '/evil_user_auth',
    passwordResetPath:       '/evil_user_auth/password',
    passwordUpdatePath:      '/evil_user_auth/password',
    tokenValidationPath:     '/evil_user_auth/validate_token',
    authProviderPaths: {
      github:    '/auth/social/jwt_user/github',
      facebook:  '/auth/social/jwt_user/facebook',
      google:    '/auth/social/jwt_user/google_oauth2'
    }
  }
}
