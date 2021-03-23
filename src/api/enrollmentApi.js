import axiosClient from './axiosClient'

const baseUrl = '/enrollments'
const enrollmentApi = {
    getEnrollments: (params) => {
        return axiosClient.get(`${baseUrl}?${params}`)
    },
    createEnrollment: (enrollmentDTO, config) => {
        return axiosClient.post(`${baseUrl}`, enrollmentDTO, config)
    },
    deleteEnrollment: (enrollmentID) => {
        return axiosClient.delete(`${baseUrl}/${enrollmentID}`)
    },
    updateEnrollment: (enrollmentDTO,enrollmentID, config) => {
        return axiosClient.put(`${baseUrl}/${enrollmentID}`, enrollmentDTO, config)
    }
}

export default enrollmentApi