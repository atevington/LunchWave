import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'

import App from './components/App'
import Login from './components/Login'
import Logout from './components/Logout'
import About from './components/About'
import Dashboard from './components/Dashboard'

import auth from './auth'

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))
