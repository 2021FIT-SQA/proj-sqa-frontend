import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from 'redux/store'
import { loggedUser } from 'redux/actions/auth.action'
import { Provider } from 'react-redux'

import './App.css'
import 'antd/dist/antd.css'
import { LandingPage, FullLayoutPage } from './layout'
import LoginPage from './shared/login/LoginComponent'
import RegisterPage from './shared/register/RegisterComponent'
import  PrivateRoute  from './config/privateRoute.config'


function App() {
  useEffect(() => {
    store.dispatch(loggedUser())
  }, [])
  return(
    <div className="app">
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path='/' component={LandingPage} />
            <section className="app__container">
              <Switch>
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={RegisterPage} />
                <PrivateRoute path='/admin' component={FullLayoutPage} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
    </div>
  )
}

export default App
