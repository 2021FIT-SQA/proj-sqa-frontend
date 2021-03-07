import axiosClient from './axiosClient'

const studentApi = {
    getPaginatedStudents: (paramsString) => {
        const url = `/students?${paramsString}`;
        return axiosClient.get(url)
    },
}

export default studentApi