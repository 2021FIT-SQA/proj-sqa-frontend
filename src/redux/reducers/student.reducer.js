import {
    GET_ALL_STUDENTS,
    GET_STUDENT_DETAIL
} from '../constants/constants.action'

const initialState = {
    student: null,
    students: [],
    pagination: {
        pageNumber: 1,
        pageSize: 10,
        totalElements: 0
    },
    loading: true,
    error: {}
}

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_STUDENTS:
            const { content, pageable,  totalElements } = payload;
            return {
                ...state,
                pagination: {
                    totalElements,
                    pageNumber: pageable.pageNumber,
                    pageSize: pageable.pageSize,
                },             
                students: content,
                loading: false
            }
        case GET_STUDENT_DETAIL:
            return {
                ...state,
                student: payload,
                loading: false
            }
        default:
            return state
    }
}

export default studentReducer