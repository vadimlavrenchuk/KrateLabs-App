import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { App, Repos, About, Home, NotFound } from './components'
import './assets/bootstrap-3.3.6/css/bootstrap.min.css'
import './assets/bootstrap-3.3.6/css/bootstrap-theme.min.css'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('app'))
