import React from 'react'
import Helmet from "react-helmet"
import Header from '../../components/Header'
import './CoreLayout.scss'
import 'styles/core.scss'
import config from 'config'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Helmet
      defaultTitle={ config.app.title }
      titleTemplate={"%s | " + config.app.title }
    />
    <Header />
    <div>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
