import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AdminCoursePage, AdminDashboardPage, AdminDeparmentPage, AdminStudentPage, AdminTeacherPage } from "../admin";
import { TestComponent } from '../end-user/TestComponent'
const routes = [
    {
        path: '/admin',
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
    {
        path: '/',
        component: TestComponent
    }
]

export const RouterConfig = () => {
    return (
        <div>
            {routes.map((route, i) => (
                    <Route exact key={i}  path={route.path} component={route.component} />
            ))}
        </div>
    )
}