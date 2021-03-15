import axiosClient from './axiosClient'

const baseUrl = '/students'
const studentApi = {
    getPaginatedStudents: (paramsString) => {
        return axiosClient.get(`${baseUrl}?${paramsString}`)
    },
    createStudent : (studentDTO, config) => {
        return axiosClient.post(baseUrl, studentDTO, config)
    },
    updateStudent: (updateStudentDTO, studentID, config) => {
        return axiosClient.put(`${baseUrl}/${studentID}`, updateStudentDTO, config)
    }
}

export default studentApi