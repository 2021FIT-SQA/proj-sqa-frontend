import enrollmentApi from 'api/enrollmentApi';
import * as constants from 'redux/constants/constants.action'

export const getEnrollments = (params, options) => async dispatch => {
    try {
        let res;
        if (options?.forCourseRelease) {
            res = await enrollmentApi.getEnrollmentsForCourseRelease(options.forCourseRelease);
        } else {
            res = await enrollmentApi.getEnrollments(params);
        }

        dispatch({
            type: constants.GET_ALL_ENROLLMENTS,
            payload: res
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: constants.ENROLLMENT_ERROR,
            payload: {error: 'GET department fail'}
        })
    }
}

export const postEnrollment = (enrollmentDTO) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await enrollmentApi.createEnrollment(enrollmentDTO, config);
        dispatch({
            type: constants.POST_ENROLLMENT,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.ENROLLMENT_ERROR,
            payload: {error: 'POST enrollment failed'}
        })
    }
}

export const deleteEnrollment = (enrollmentID) => async dispatch => {
    try {
        const res = await enrollmentApi.deleteDepartment(enrollmentID);
        dispatch({
            type: constants.DELETE_ENROLLMENT,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.ENROLLMENT_ERROR,
            payload: { error: 'DELETE enrollment failed'}
        })
    }
}

export const updateEnrollment = (enrollmentDTO, enrollmentID) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await enrollmentApi.updateEnrollment(enrollmentDTO, enrollmentID, config);
        dispatch({
            type: constants.UPDATE_ENROLLMENT,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.ENROLLMENT_ERROR,
            payload: { error: 'UPDATE enrollment failed'}
        })
    }
}