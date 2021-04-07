export const COMMON = {
    LOGIN: { name: 'Login', path: ['/', '/login'] },
    NO_MATCH: { name: '404 Not Found', path: '*' },
}

export const ADMIN = {
    HOME: { name: '', path: '/admin' },
    DASHBOARD: { name: 'Dashboard', path: '/admin/dashboard' },
    STUDENT: { name: 'Student', path: '/admin/students'},
    STUDENT_DETAIL: { name: 'Student detail', path: '/admin/students/detail/:id'},
    TEACHER: { name: 'Teacher', path: '/admin/teachers'},
    COURSE: { name: 'Course', path: '/admin/courses'},
    COURSE_DETAIL: { name: 'Course detail', path: '/admin/courses/detail/:id'},
    DEPARTMENT: { name: 'Deparment', path: '/admin/departments'},
    COURSE_RELEASE: { name: 'Course Release', path: '/admin/courseReleases'},
    COURSE_RELEASE_DETAIL: { name: 'Release detail', path: '/admin/courseReleases/detail/:id'},
    NO_MATCH: { name: '404 Not Found', path: '*' },
}

export const END_USER = {
    DASHBOARD: { name: 'Login', path: ['/admin', '/end-user/dashboard'] },
    NO_MATCH: { name: '404 Not Found', path: '*' },
}