import axiosClient from './axiosClient'

const baseUrl = '/students'
const studentApi = {
    getStudentDetail: (id) => {
        return axiosClient.get(`${baseUrl}/${id}`);
    },
    getPaginatedStudents: (paramsString) => {
        return axiosClient.get(`${baseUrl}?${paramsString}`)
    },
    createStudent : (studentDTO, config) => {
        return axiosClient.post(baseUrl, studentDTO, config)
    },
    updateStudent: (updateStudentDTO, studentID, config) => {
        return axiosClient.put(`${baseUrl}/${studentID}`, updateStudentDTO, config)
    },
    deleteStudent: (studentID) => {
        return axiosClient.delete(`${baseUrl}/${studentID}`);
    }
}

export default studentApi