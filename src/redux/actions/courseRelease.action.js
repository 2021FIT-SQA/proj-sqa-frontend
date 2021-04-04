import courseReleaseApi from 'api/courseReleaseApi';
import * as constants from 'redux/constants/constants.action';

export const getCourseReleases = (params, options) => async dispatch => {
    try {
        let res;
        if (options?.forCourse) {
            res = await courseReleaseApi.getForCourse(options.forCourse, params);
        } else {
            res = await courseReleaseApi.getCourseReleases(params);
        }
        dispatch({
            type: constants.GET_ALL_COURSE_RELEASES,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: constants.COURSE_RELEASE_ERROR,
            payload: {error: 'GET course release failed'}
        })
    }
}
