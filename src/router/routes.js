import { COMMON, ADMIN, END_USER } from './route-constants';

import LoginPage from '../shared/login/LoginComponent';
import AdminDashboardPage from '../admin/dashboard/index';
import AdminStudentPage  from '../admin/student/index';
import AdminEntry from '../layout/components/admin-entry/index'
import AdminTeacherPage from '../admin/teacher/index'
import AdminCoursePage from '../admin/course/index'
import AdminDepartmentPage from '../admin/department/index'
import AdminCourseReleasePage from '../admin/course-release/index'
import StudentDetail from '../admin/student/student-detail'

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
    component: AdminEntry,
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
      {
        path: ADMIN.STUDENT_DETAIL.path,
        component: StudentDetail,
        exact: true,
        meta: {
          title: ADMIN.STUDENT_DETAIL.name,
          requiresAuth: true,
        }
      },
      {
        path: ADMIN.TEACHER.path,
        component: AdminTeacherPage,
        exact: true,
        meta: {
          title: ADMIN.TEACHER.name,
          requiresAuth: true,
        }
      },
      {
        path: ADMIN.COURSE.path,
        component: AdminCoursePage,
        exact: true,
        meta: {
          title: ADMIN.COURSE.name,
          requiresAuth: true,
        }
      },
      {
        path: ADMIN.DEPARTMENT.path,
        component: AdminDepartmentPage,
        exact: true,
        meta: {
          title: ADMIN.DEPARTMENT.name,
          requiresAuth: true,
        }
      },
      {
        path: ADMIN.COURSE_RELEASE.path,
        component: AdminCourseReleasePage,
        exact: true,
        meta: {
          title: ADMIN.COURSE_RELEASE.name,
          requiresAuth: true,
        }
      },
    ]
  }
]

export default routesMap