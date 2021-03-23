import * as types from 'redux/constants/constants.action'

const initialState = {
    courseRelease: null,
    courseReleases: [],
    pagination: {
        current: 1,
        pageSize: 1,
        total: 0
    },
    loading: true,
    error: {}
}

const courseReleaseReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.GET_ALL_COURSE_RELEASES:
            return {
                ...state,
                courseReleases: payload.content,
                pagination: {
                    ...state.pagination,
                    current: payload.pageable.pageNumber + 1,
                    pageSize: payload.pageable.pageSize,
                    total: payload.totalElements
                },
                loading: false
            }
        case types.COURSE_RELEASE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default courseReleaseReducer