import axiosClient from './axiosClient'

const baseUrl = '/departments'
const departmentApi = {
    getAllDepartments: () => {
        return axiosClient.get(`${baseUrl}/all`)
    },
    createDepartment: (departmentDTO, config) => {
        return axiosClient.post(`${baseUrl}`, departmentDTO, config)
    },
    deleteDepartment: (departmentID) => {
        return axiosClient.delete(`${baseUrl}/${departmentID}`)
    },
    updateDepartment: (departmentDTO,departmentID, config) => {
        return axiosClient.put(`${baseUrl}/${departmentID}`, departmentDTO, config)
    }
}

export default departmentApi