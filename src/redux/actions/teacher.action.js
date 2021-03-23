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

export const postTeacher = (createTeacherDTO) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await teacherApi.postTeacher(createTeacherDTO, config);
        dispatch({
            type: constants.POST_TEACHER,
            payload: res
        })
        return res;
    } catch (err) {
        dispatch({
            type: constants.TEACHER_ERROR,
            payload: {error: 'error'}
        })
    }
}

export const updateTeacher = (updateTeacherDTO, teacherID) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        // TODO: call api here
        const res = await teacherApi.updateTeacher(updateTeacherDTO, teacherID, config);
        dispatch({
            type: constants.UPDATE_TEACHER,
            payload: res
        })
        return res;
    } catch (error) {
        dispatch({
            type: constants.TEACHER_ERROR,
            payload: { error: 'update teacher fail'}
        })
    }
}

export const deleteTeacher = (teacherID) => async dispatch => {
    try {
        const res = await teacherApi.deleteTeacher(teacherID);
        dispatch({
            type: constants.DELETE_TEACHER,
            payload: res
        })
        return res;
    } catch (error) {
        dispatch({
            type: constants.TEACHER_ERROR,
            payload: { error: 'delete teacher fail'}
        })
    }
}