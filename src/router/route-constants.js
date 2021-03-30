export const COMMON = {
    LOGIN: { name: 'Login', path: ['/', '/login'] },
    NO_MATCH: { name: '404 Not Found', path: '*' },
}

export const ADMIN = {
    HOME: { name: '', path: ['/admin/index', ] },
    DASHBOARD: { name: 'Dashboard', path: ['/admin/dashboard'] },
    STUDENT: { name: 'Student', path: '/admin/students'},
    STUDENT_DETAIL: { name: '*', path: '/admin/students/detail/:id'},
    TEACHER: { name: 'Teacher', path: '/admin/teachers'},
    COURSE: { name: 'Course', path: '/admin/courses'},
    DEPARTMENT: { name: 'Deparment', path: '/admin/departments'},
    COURSE_RELEASE: { name: 'Course Release', path: '/admin/courseRelease'},
    NO_MATCH: { name: '404 Not Found', path: '*' },
}

export const END_USER = {
    DASHBOARD: { name: 'Login', path: ['/admin', '/end-user/dashboard'] },
    NO_MATCH: { name: '404 Not Found', path: '*' },
}