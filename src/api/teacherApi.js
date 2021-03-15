import axiosClient from './axiosClient'

const teacherApi = {
    getTeachers: (paramsString) => {
        return axiosClient.get(`/teachers?${paramsString}`)
    }
}

export default teacherApi