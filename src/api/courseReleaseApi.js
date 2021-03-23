import axiosClient from './axiosClient'

const baseUrl = '/courseReleases'
const courseReleaseApi = {
    getCourseReleases: (params) => {
        return axiosClient.get(`${baseUrl}?${params}`)
    },
}

export default courseReleaseApi