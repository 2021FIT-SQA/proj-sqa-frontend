import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import 'antd/dist/antd.css';

import { LandingPage } from './layout'
import { LoginPage } from './shared';

function App() {
  return(
    <div className="app">
      <Router>
        <Fragment>
          <Route exact path='/' component={LandingPage} />
          <section className="app__container">
            <Switch>
              <Route exact path='/login' component={LoginPage} />
            </Switch>
          </section>
        </Fragment>
      </Router>
       
    </div>
  )
}

export default App;
