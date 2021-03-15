import axiosClient from './axiosClient'

const userApi = {
    checkUsernameUnique: (username) => {
        const url = `/User/checkUniqueness/username/${username}`
        return axiosClient.get(url);
    },

    checkEmailUnique: (email) => {
        const url = `/User/checkUniqueness/email/${email}`
        return axiosClient.get(url);
    },

    checkPhoneNumberUnique: (phoneNumber) => {
        const url = `/User/checkUniqueness/phoneNumber/${phoneNumber}`
        return axiosClient.get(url);
    },
}

export default userApi