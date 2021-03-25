import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import CONFIG from '../../config'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { ADMIN } from '../../router/route-constants'


const PrivateRoute = withRouter(({
  component: Component,
  childrenRoutes,
  isAuthenticated,
  location,
  ...rest
}) => {
  const { meta } = rest;
  if (meta) {
    if (meta.title) {
      document.title = `${meta.title} - ${CONFIG.title}`
    } else {
      document.title = CONFIG.title
    }
  }

  if (meta.isLoginToHome && isAuthenticated) {
    const redirectUrl = qs.parse(location.search).redirectUrl;
    const url = redirectUrl || ADMIN.DASHBOARD.path
    return <Redirect to={url.toString()} />
  }

  return (
    <Route render={props => {
      return (
        isAuthenticated 
        ? (
          <Component {...props} {...rest}>
            {Array.isArray(childrenRoutes) ? (
              <Switch>
                {childrenRoutes.map((route, idx) => (
                  <PrivateRouteComponent {...route} key={idx} />
                ))}
              </Switch>
            ) : null}
          </Component>
        ) 
        : 
        (
          <Redirect to='/login'/>
        )
      )
    }} />
  )
})

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export const PrivateRouteComponent = connect(mapStateToProps, null)(PrivateRoute);
export default PrivateRouteComponent;
