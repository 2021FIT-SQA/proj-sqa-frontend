import { ADMIN } from '../router/route-constants'
import { HomeOutlined, UserOutlined, BookOutlined, ReadOutlined , BankOutlined, TeamOutlined } from '@ant-design/icons'

export const ADMIN_SIDER_MENU_LIST = [
    {
        path: ADMIN.DASHBOARD.path,
        icon: <HomeOutlined />,
        name: ADMIN.DASHBOARD.name
    },
    {
        path: ADMIN.STUDENT.path,
        icon: <UserOutlined />,
        name: ADMIN.STUDENT.name
    },
    {
        path: ADMIN.TEACHER.path,
        icon: <TeamOutlined />,
        name: ADMIN.TEACHER.name
    },
    {
        path: ADMIN.COURSE.path,
        icon: <BookOutlined />,
        name: ADMIN.COURSE.name
    },
    {
        path: ADMIN.DEPARTMENT.path,
        icon: <BankOutlined />,
        name: ADMIN.DEPARTMENT.name
    },
    {
        path: ADMIN.COURSE_RELEASE.path,
        icon: <ReadOutlined />,
        name: ADMIN.COURSE_RELEASE.name
    },
]