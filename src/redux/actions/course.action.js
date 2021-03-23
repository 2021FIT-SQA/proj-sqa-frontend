import courseApi from '../../api/courseApi'
import * as constants from '../constants/constants.action'

// GET ALL PAGINATED COURSES
export const getCourses = (paramsString) => async dispatch => {
    const res = await courseApi.getPaginatedCourses(paramsString);
    dispatch({
        type: constants.GET_ALL_COURSES,
        payload: res
    })   
}

export const postCourse = (createCourseDTO) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await courseApi.createCourse(createCourseDTO, config);
        dispatch({
            type: constants.POST_COURSE,
            payload: res
        })
        return res;
    } catch (err) {
        dispatch({
            type: constants.COURSE_ERROR,
            payload: {error: 'error'}
        })
    }
}

export const updateCourse = (updateCourseDTO, courseID) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        // TODO: call api here
        const res = await courseApi.updateCourse(updateCourseDTO, courseID, config);
        dispatch({
            type: constants.UPDATE_COURSE,
            payload: res
        })
        return res;
    } catch (error) {
        dispatch({
            type: constants.COURSE_ERROR,
            payload: { error: 'update course fail'}
        })
    }
}

export const deleteCourse = (courseID) => async dispatch => {
    try {
        const res = await courseApi.deleteCourse(courseID);
        dispatch({
            type: constants.DELETE_COURSE,
            payload: res
        })
        return res;
    } catch (error) {
        dispatch({
            type: constants.COURSE_ERROR,
            payload: { error: 'delete course fail'}
        })
    }
}