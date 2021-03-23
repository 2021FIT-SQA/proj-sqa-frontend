import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// LAYOUT
import MainAdmin from "layout/main-admin/MainAdmin";
import Main from "layout/main/Main";

// COMPONENT
import LoginPage from "shared/login/LoginComponent";
import LandingPage from "layout/landing/LandingComponent";
import UserDashboardPage from "end-user/UserDashboard";
import PrivateRoute from "config/privateRoute.config";
import { Spin } from "antd";

import { connect } from "react-redux";

import {
  AdminDashboardPage,
  AdminCoursePage,
  AdminDepartmentPage,
  AdminEnrollmentPage,
  AdminStudentPage,
  AdminTeacherPage,
  AdminCourseReleasePage
} from "admin";

const RouterConfig = ({ loading }) => {
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Spin size="large" />
        </div>
      </div>
    );

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/admin/:path?" exact>
          <MainAdmin>
            <Switch>
              <PrivateRoute
                path="/admin"
                exact
                component={AdminDashboardPage}
              />
              <PrivateRoute
                path="/admin/students"
                component={AdminStudentPage}
              />
              <PrivateRoute
                path="/admin/teachers"
                component={AdminTeacherPage}
              />
              <PrivateRoute path="/admin/courses" component={AdminCoursePage} />
              <PrivateRoute
                path="/admin/departments"
                component={AdminDepartmentPage}
              />
              <PrivateRoute
                path="/admin/enrollments"
                component={AdminEnrollmentPage}
              />
              <PrivateRoute
                path="/admin/courseRelease"
                component={AdminCourseReleasePage}
              />
            </Switch>
          </MainAdmin>
        </Route>

        <Route path="user/:path?" exact>
          <Main>
            <Switch>
              <Route path="/user" exact component={UserDashboardPage} />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, null)(RouterConfig);
