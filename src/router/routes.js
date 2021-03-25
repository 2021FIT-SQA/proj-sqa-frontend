import { COMMON, ADMIN, END_USER } from './route-constants';

import MainAdmin from '../layout/main-admin/MainAdmin';
import LoginPage from '../shared/login/LoginComponent';
import AdminDashboardPage from '../admin/dashboard';
import AdminStudentPage  from '../admin/student'

const routesMap = [
  {
    path: COMMON.LOGIN.path,
    exact: true,
    component: LoginPage,
    meta: {
        requiresAuth: false,
        title: COMMON.LOGIN.name,
        isLoginToHome: true
    }
  },
  {
    path: ADMIN.HOME.path,
    component: MainAdmin,
    meta: {
        requiresAuth: true
    },
    childrenRoutes: [
      {
        path: ADMIN.DASHBOARD.path,
        component: AdminDashboardPage,
        exact: true,
        meta: {
          title: ADMIN.DASHBOARD.name,
          requiresAuth: true,
        }
      },
      {
        path: ADMIN.STUDENT.path,
        component: AdminStudentPage,
        exact: true,
        meta: {
          title: ADMIN.STUDENT.name,
          requiresAuth: true,
        }
      },
    ]
  }
]

export default routesMap