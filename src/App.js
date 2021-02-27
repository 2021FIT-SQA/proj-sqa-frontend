import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import 'antd/dist/antd.css'

import { LoginPage } from './shared'
import { FullLayoutPage } from 'layout'

function App() {
  const token = localStorage.getItem('token')
  return(
    <div className="app">
      <Router>
        <Fragment>
          <section className="app__container">
            <Switch>
              <Route exact path='/' component={LoginPage} />
              {token && <FullLayoutPage />}
            </Switch>
          </section>
        </Fragment>
      </Router>
       
    </div>
  )
}

export default App;
