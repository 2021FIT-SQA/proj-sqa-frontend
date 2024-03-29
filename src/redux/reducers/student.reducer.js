import * as constants from '../constants/constants.action'

const initialState = {
    student: null,
    students: [],
    loading: true,
    error: {}
}

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.GET_ALL_STUDENTS:
            const { content } = payload;
            return {
                ...state,
                students: content,
                loading: false
            }
        case constants.GET_STUDENT_DETAIL:
        case constants.UPDATE_STUDENT:
            return {
                ...state,
                student: payload,
                loading: false
            }
        case constants.POST_STUDENT:
            return {
                ...state,
                student: payload,
                students: [payload, ...state.students],
                loading: false
            }
        case constants.DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== payload.config.url.subString(10))
            }
        case constants.STUDENT_ERROR:
            console.log(payload)
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default studentReducer