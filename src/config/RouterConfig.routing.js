import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// LAYOUT 
import MainAdmin from 'layout/main-admin/MainAdmin'
import Main from 'layout/main/Main'

// COMPONENT 
import LoginPage from 'shared/login/LoginComponent'
import LandingPage from 'layout/landing/LandingComponent'
import AdminDashboardPage from 'admin/dashboard/DashboardContainer'
import UserDashboardPage from 'end-user/UserDashboard'

const RouterConfig = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={LoginPage} />

        <Route path='/admin/:path?' exact>
          <MainAdmin>
            <Switch>
              <Route path='/admin' exact component={AdminDashboardPage} />
            </Switch>
          </MainAdmin>
        </Route>
        
        <Route>
          <Main>
            <Switch>
              <Route path='/' component={LandingPage} />
              <Route path='/user' exact component={UserDashboardPage} />
            </Switch>
          </Main>
        </Route>


      </Switch>
    </Router>
  )
}

export default RouterConfig
