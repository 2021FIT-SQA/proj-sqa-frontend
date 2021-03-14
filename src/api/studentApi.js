import axiosClient from './axiosClient'

const studentApi = {
    getPaginatedStudents: (paramsString) => {
        const url = `/students?${paramsString}`;
        return axiosClient.get(url)
    },
    createStudent : (studentDTO, config) => {
        const url = '/students';
        return axiosClient.post(url, studentDTO, config)
    }
}

export default studentApi