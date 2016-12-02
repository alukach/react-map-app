import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { OAuthSignInButton } from "redux-auth/material-ui-theme";

import { config } from 'config'
import './Header.scss'

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
      </ToolbarGroup>
    </div>
  </AppBar>
)

export default Header
