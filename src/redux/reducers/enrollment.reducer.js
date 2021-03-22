import * as types from 'redux/constants/constants.action'

const initialState = {
    enrollment: null,
    enrollments: [],
    pagination: {
        current: 1,
        pageSize: 1,
        total: 0
    },
    isLoading: true,
    error: {}
}

const enrollmentReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.GET_ALL_ENROLLMENTS:
            return {
                ...state,
                enrollments: payload.content,
                pagination: {
                    ...state.pagination,
                    current: payload.pageable.pageNumber + 1,
                    pageSize: payload.pageable.pageSize,
                    total: payload.totalElements
                },
                isLoading: false
            }
        case types.POST_ENROLLMENT:
            return {
                ...state,
                enrollment: payload,
                enrollments: [
                    ...state.enrollment,
                    payload
                ],
                isLoading: false,
            }
        case types.DELETE_ENROLLMENT:
            return {
                ...state,
                enrollments: state.enrollments.filter(ele => ele.id !== payload.id),
                isLoading: false
            }
        case types.UPDATE_ENROLLMENT:
            return {
                ...state,
                enrollment: payload,
                isLoading: false
            }
        case types.ENROLLMENT_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default:
            return state
    }
}

export default enrollmentReducer