import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Redirect, Route, Router } from 'react-router'

import App from './components/App'
import OrderForm from './components/OrderForm'
import Dashboard from './components/Dashboard'

import auth from './auth'

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="orderform" component={OrderForm} onEnter={requireAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
    <Redirect from="*" to="/" />
  </Router>
), document.getElementById('root'))
