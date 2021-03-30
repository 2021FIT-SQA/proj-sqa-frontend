import { ADMIN } from '../router/route-constants'
import { CameraTwoTone } from '@ant-design/icons'

export const ADMIN_SIDER_MENU_LIST = [
    {
        path: ADMIN.DASHBOARD.path,
        icon: <CameraTwoTone />,
        name: ADMIN.DASHBOARD.name
    },
    {
        path: ADMIN.STUDENT.path,
        icon: <CameraTwoTone />,
        name: ADMIN.STUDENT.name
    },
    {
        path: ADMIN.TEACHER.path,
        icon: <CameraTwoTone />,
        name: ADMIN.TEACHER.name
    },
    {
        path: ADMIN.COURSE.path,
        icon: <CameraTwoTone />,
        name: ADMIN.COURSE.name
    },
    {
        path: ADMIN.DEPARTMENT.path,
        icon: <CameraTwoTone />,
        name: ADMIN.DEPARTMENT.name
    },
    {
        path: ADMIN.COURSE_RELEASE.path,
        icon: <CameraTwoTone />,
        name: ADMIN.COURSE_RELEASE.name
    },
]