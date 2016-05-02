"use strict"
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { App } from './components'
import './assets/bootstrap-sass-3.3.6/stylesheets/_bootstrap.scss'
import './assets/css/base.scss'

var routes = (
  <Route>
    <Route name='default view' path="/" view='default' component={ App } />
  </Route>
)

render(
  <Router history={ hashHistory } routes={ routes } />,
  document.getElementById('app')
)
