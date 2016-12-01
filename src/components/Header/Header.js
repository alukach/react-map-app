import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Facebook from '../Auth/Facebook'
import './Header.scss'

const configFacebook = {
  clientId        : '344200949077076',
  url             : '/api/auth/social/jwt_user/facebook/',
  redirectUri     : 'http://localhost:8000/api/auth/social/jwt_user/facebook/',
  authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
  scope           :'email,user_location',
  width           : 580,
  height          : 400
}
export const Header = () => (

  <AppBar
    title="El See Em">
    <div className="navlinks">
      <ToolbarGroup>
        <IndexLink to='/' activeClassName="activeRoute">
          <FlatButton label="Home" />
        </IndexLink>
        <Link to='/counter' activeClassName="activeRoute">
          <FlatButton label="Counter" />
        </Link>
        <Link to='/map' activeClassName="activeRoute">
          <FlatButton label="Map" />
        </Link>
        <Link to='/zen' activeClassName="activeRoute">
          <FlatButton label="Zen" />
        </Link>
        <Facebook
          config={configFacebook}
          callback={console.log}
        />
      </ToolbarGroup>
    </div>
  </AppBar>
)

export default Header
