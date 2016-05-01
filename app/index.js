"use strict"
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { App } from './components'
import './assets/bootstrap-3.3.6/css/bootstrap.min.css'
import './assets/bootstrap-3.3.6/css/bootstrap-theme.min.css'

var routes = (
  <Route>
    <Route name='default view' path="/" view='default' component={ App } />
  </Route>
)

render(
  <Router history={ hashHistory } routes={ routes } />,
  document.getElementById('app')
)
