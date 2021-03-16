import * as constants from '../constants/constants.action'

const initialState = {
    teacher: null,
    teachers: [],
    loading: true,
    error: {}
}

const teacherReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.GET_ALL_TEACHERS:
            return {
                ...state,
                teachers: payload.content,
                loading: false
            }
        case constants.UPDATE_TEACHER:
            return {
                ...state,
                teacher: payload,
                loading: false
            }
        case constants.POST_TEACHER:
            return {
                ...state,
                teacher: payload,
                teachers: [payload, ...state.teachers],
                loading: false
            }
        case constants.DELETE_TEACHER:
            return {
                ...state,
                teachers: state.teachers.filter(teacher => teacher.id !== payload.config.url.subString(10))
            }
        case constants.TEACHER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default teacherReducer