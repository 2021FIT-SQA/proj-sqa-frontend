import axiosClient from "./axiosClient"

const authApi = {
    getToken: (body) => {
        const url = '/auth/login'
        return axiosClient.post(url, body)
    },
    getAuth: () => {
        const url = '/auth/whoami';
        return axiosClient.get(url)
    }
}

export default authApi