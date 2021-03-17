import axiosClient from './axiosClient'

const baseUrl = '/teachers'
const teacherApi = {
    getTeachers: (paramsString) => {
        return axiosClient.get(`${baseUrl}?${paramsString}`)
    },
    postTeacher: (teacherDTO, config) => {
        return axiosClient.post(baseUrl, teacherDTO, config);
    },
    updateTeacher: (updateDTO, teacherID, config) => {
        return axiosClient.put(`${baseUrl}/${teacherID}`, updateDTO, config)
    },
    deleteTeacher: (teacherID) => {
        return axiosClient.delete(`${baseUrl}/${teacherID}`)
    }
}

export default teacherApi