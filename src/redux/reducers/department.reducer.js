import * as types from 'redux/constants/constants.action'

const initialState = {
    department: null,
    departments: [],
    isLoading: true,
    error: {}
}

const departmentReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.GET_ALL_DEPARTMENTS:
            return {
                ...state,
                departments: payload,
                isLoading: false
            }
        case types.POST_DEPARTMENT:
            return {
                ...state,
                department: payload,
                departments: [
                    ...state,
                    payload
                ],
                isLoading: false,
            }
        case types.DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(ele => ele.id !== payload.id),
                isLoading: false
            }
        case types.UPDATE_DEPARTMENT:
            return {
                ...state,
                department: payload,
                isLoading: false
            }
        case types.DEPARTMENT_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state
    }
}

export default departmentReducer