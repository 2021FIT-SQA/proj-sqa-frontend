import axiosClient from './axiosClient'

const baseUrl = '/courseReleases'
const courseReleaseApi = {
    getCourseReleases: (params) => {
        return axiosClient.get(`${baseUrl}?${params}`)
    },
    getById: (courseReleaseID) => {
        return axiosClient.get(`${baseUrl}/${courseReleaseID}`);
    },
    getForCourse: (courseID, params) => {
        return axiosClient.get(`/courses/${courseID}/releases?${params}`);
    }
}

export default courseReleaseApi