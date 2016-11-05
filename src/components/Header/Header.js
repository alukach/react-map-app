import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

export const Header = () => (
  <Toolbar>
    <ToolbarTitle text="El See Em" />
    <ToolbarGroup>
      <IndexLink to='/' activeClassName='route--active'>
        <FlatButton label="Home" />
      </IndexLink>
      <Link to='/counter' activeClassName='route--active'>
        <FlatButton label="Counter" />
      </Link>
      <Link to='/map' activeClassName='route--active'>
        <FlatButton label="Map" />
      </Link>
    </ToolbarGroup>
  </Toolbar>
)

export default Header
