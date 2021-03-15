import teacherApi from 'api/teacherApi'
import * as constants from 'redux/constants/constants.action'

export const getTeachers = (paramsString) => async dispatch =>  {
    try {
        // TODO: call api here
        const res = await teacherApi.getTeachers(paramsString)
        dispatch({
            type: constants.GET_ALL_TEACHERS,
            payload: res
        })
        
    } catch (error) {
        dispatch({
            type: constants.TEACHER_ERROR,
            payload: error.message
        })
    }
}