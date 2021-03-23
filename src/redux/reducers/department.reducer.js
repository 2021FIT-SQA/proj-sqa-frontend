import * as types from 'redux/constants/constants.action'

const initialState = {
    department: null,
    departments: [],
    pagination: {
        current: 1,
        pageSize: 1,
        total: 0
    },
    loading: true,
    error: {}
}

const departmentReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.GET_ALL_DEPARTMENTS:
            return {
                ...state,
                departments: payload.content,
                pagination: {
                    ...state.pagination,
                    current: payload.pageable.pageNumber + 1,
                    pageSize: payload.pageable.pageSize,
                    total: payload.totalElements
                },
                loading: false
            }
        case types.POST_DEPARTMENT:
            return {
                ...state,
                department: payload,
                departments: [
                    ...state.departments,
                    payload
                ],
                loading: false,
            }
        case types.DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(ele => ele.id !== payload.id),
                loading: false
            }
        case types.UPDATE_DEPARTMENT:
            return {
                ...state,
                department: payload,
                loading: false
            }
        case types.DEPARTMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default departmentReducer