import {
    GET_ALL_STUDENTS,
    GET_STUDENT_DETAIL
} from '../constants/constants.action'

const initialState = {
    student: null,
    students: [],
    loading: true,
    error: {}
}

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: payload,
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