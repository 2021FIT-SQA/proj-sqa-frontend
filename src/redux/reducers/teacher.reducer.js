import * as constants from '../constants/constants.action'

const initialState = {
    teacher: null,
    teachers: [],
    pagination: {
        current: 1,
        pageSize: 10,
    },
    loading: true,
    error: {}
}

const teacherReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.GET_ALL_TEACHERS:
            const {pageable, totalElements, content} = payload;
            return {
                ...state,
                teachers: content,
                pagination: {
                    current: pageable.pageNumber + 1,
                    pageSize: pageable.pageSize,
                    total: totalElements
                },
                loading: false
            }
        case constants.TEACHER_ERROR:
            console.log(payload)
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