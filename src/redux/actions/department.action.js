import departmentApi from 'api/departmentApi';
import * as constants from 'redux/constants/constants.action'

export const getDepartments = (params) => async dispatch => {
    try {
        const res = await departmentApi.getDepartments(params);
        dispatch({
            type: constants.GET_ALL_DEPARTMENTS,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.DEPARTMENT_ERROR,
            payload: {error: 'GET department fail'}
        })
    }
}

export const postDepartment = (departmentDTO) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await departmentApi.createDepartment(departmentDTO, config);
        dispatch({
            type: constants.POST_DEPARTMENT,
            payload: res
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: constants.DEPARTMENT_ERROR,
            payload: {error: 'POST department fail'}
        })
    }
}

export const deleteDepartment = (departmentID) => async dispatch => {
    try {
        const res = await departmentApi.deleteDepartment(departmentID);
        dispatch({
            type: constants.DELETE_DEPARTMENT,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.DEPARTMENT_ERROR,
            payload: { error: 'DELETE department fail'}
        })
    }
}

export const updateDepartment = (departmentDTO, departmentID) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await departmentApi.updateDepartment(departmentDTO, departmentID, config);
        dispatch({
            type: constants.UPDATE_DEPARTMENT,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.DEPARTMENT_ERROR,
            payload: { error: 'UPDATE department fail'}
        })
    }
}