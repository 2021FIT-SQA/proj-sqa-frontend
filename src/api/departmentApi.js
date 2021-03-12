import axiosClient from './axiosClient'

const departmentApi = {
    getAllDepartments: () => {
        const url = `/departments/all`;
        return axiosClient.get(url)
    },
}

export default departmentApi