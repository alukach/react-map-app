import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    const muiTheme = getMuiTheme({  // http://www.material-ui.com/#/customization/themes#customizing-the-theme
      appBar: {
        height: 50,
      },
    })

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={browserHistory} children={routes} />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default AppContainer
