import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import './Header.scss'

export const Header = () => (
  <Toolbar>
    <ToolbarTitle text="El See Em" />
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
    </ToolbarGroup>
  </Toolbar>
)

export default Header
