import React from 'react'
import { Route } from 'react-router-dom'

import { Layout } from 'antd';
import { SiderComponent } from '../sider/SiderComponent' 
import { 
    AdminDashboardPage,
    AdminStudentPage,
    AdminTeacherPage,
    AdminDeparmentPage,
    AdminCoursePage
  } from 'admin';

const { Header, Content } = Layout;

const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: AdminDashboardPage,
    },
    {
        path: '/admin/students',
        component: AdminStudentPage
    },
    {
        path: '/admin/teachers',
        component: AdminTeacherPage
    },
    {
        path: '/admin/deparments',
        component: AdminDeparmentPage
    },
    {
        path: '/admin/courses',
        component: AdminCoursePage
    },
  ]

const FullLayoutPage = () => {
    return (
        <div>
            <Layout>
                <SiderComponent className="App__sidebar" />
                <Layout className="App__wrapper">
                    <Header className="App__wrapper__header" style={{padding: 0, background: "#fff"}}>
                        This is header
                    </Header>
                    <Content
                    className="App__wrapper__content"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                    }}
                    >
                        {
                            adminRoutes.map((route, index) => (
                               <Route exact path={route.path} component={route.component} key={index} />
                            ))
                        }
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default FullLayoutPage
