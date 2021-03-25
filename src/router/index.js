import React, { useEffect } from 'react'
import PrivateRoute from '../shared/private-route/PrivateRoute'
import CONFIG from '../config'
import routesMap from './routes'
import LoginPage from 'shared/login/LoginComponent'
import { connect } from 'react-redux'
import { loggedUser } from 'redux/actions/auth.action'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Routes = ({ dispatch }) => {

  useEffect(() => {
    dispatch(loggedUser())
  })

  return (
    <Router basename={CONFIG.baseURL}>
      <Route path="/login" exact component={LoginPage} />
      <Switch>
        {routesMap.map((route, idx) => {
          return (
            <PrivateRoute {...route} key={idx} />
          )
        })}
      </Switch>
    </Router>
  )
}

export default connect()(Routes)
