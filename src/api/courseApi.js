import axiosClient from './axiosClient'

const baseUrl = '/courses'
const courseApi = {
    getPaginatedCourses: (paramsString) => {
        return axiosClient.get(`${baseUrl}?${paramsString}`)
    },
    createCourse : (courseDTO, config) => {
        return axiosClient.post(baseUrl, courseDTO, config)
    },
    updateCourse: (updateCourseDTO, courseID, config) => {
        return axiosClient.put(`${baseUrl}/${courseID}`, updateCourseDTO, config)
    },
    deleteCourse: (courseID) => {
        return axiosClient.delete(`${baseUrl}/${courseID}`);
    },
    checkRegistrationCodeUnique: (registrationCode) => {
        return axiosClient.get(`/Course/checkUniqueness/registrationCode/${registrationCode}`);
    }
}

export default courseApi