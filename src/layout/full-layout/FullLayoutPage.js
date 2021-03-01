import React from 'react'
import { BrowserRouter as Router ,Route, useRouteMatch, Switch } from 'react-router-dom'

import { Layout } from 'antd';
import { SiderComponent } from '../sider/SiderComponent' 
import { 
    AdminDashboardPage,
    AdminStudentPage,
    AdminTeacherPage,
    AdminDepartmentPage,
    AdminCoursePage
  } from 'admin';

const { Header, Content, Footer } = Layout;

const adminRoutes = [
    {
        path: '/admin/students',
        component: AdminStudentPage
    },
    {
        path: '/admin/teachers',
        component: AdminTeacherPage
    },
    {
        path: '/admin/departments',
        component: AdminDepartmentPage
    },
    {
        path: '/admin/courses',
        component: AdminCoursePage
    },
  ]

const FullLayoutPage = () => {
    const { url } = useRouteMatch();
    return (
        <div>
            <Router>
                <Layout>
                    <SiderComponent url={url} className="App__sidebar" />
                    <Layout className="App__wrapper">
                        <Header className="App__wrapper__header" style={{padding: 0, paddingLeft: 16, background: "#fff"}}>
                            This is header
                        </Header>
                        <Content
                        className="App__wrapper__content"
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            background: "#fff",
                            minHeight: 280
                        }}
                        >
                            <Switch>
                                <Route exact path='/admin' component={AdminDashboardPage} />
                                {
                                adminRoutes.map((route, index) => (
                                    <Route path={route.path} component={route.component} key={index} />
                                ))
                                }
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            This is our footer.
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        </div>
    )
}
export default FullLayoutPage