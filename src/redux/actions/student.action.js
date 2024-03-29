import studentApi from '../../api/studentApi'
import * as constants from '../constants/constants.action'


export const getStudent = (id) => async dispatch => {
    try {
        const res = await studentApi.getStudentDetail(id);
        dispatch({
            type: constants.GET_STUDENT_DETAIL,
            payload: res
        });
    } catch (error) {
        dispatch({
            type: constants.STUDENT_ERROR,
            payload: { error }
        })
    }
}
// GET ALL PAGINATED STUDENTS
export const getStudents = (paramsString) => async dispatch => {
    const res = await studentApi.getPaginatedStudents(paramsString);
    dispatch({
        type: constants.GET_ALL_STUDENTS,
        payload: res
    })   
}

export const postStudent = (createStudentDTO) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    }
    try {
        const res = await studentApi.createStudent(createStudentDTO, config);
        dispatch({
            type: constants.POST_STUDENT,
            payload: res
        })
        return res;
    } catch (err) {
        dispatch({
            type: constants.STUDENT_ERROR,
            payload: {error: 'error'}
        })
    }
}

export const updateStudent = (updateStudentDTO, studentID) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        // TODO: call api here
        const res = await studentApi.updateStudent(updateStudentDTO, studentID, config);
        dispatch({
            type: constants.UPDATE_STUDENT,
            payload: res
        })
        return res;
    } catch (error) {
        dispatch({
            type: constants.STUDENT_ERROR,
            payload: { error: 'update student fail'}
        })
    }
}

export const deleteStudent = (studentID) => async dispatch => {
    try {
        const res = await studentApi.deleteStudent(studentID);
        dispatch({
            type: constants.DELETE_STUDENT,
            payload: res
        })
        return res;
    } catch (error) {
        dispatch({
            type: constants.STUDENT_ERROR,
            payload: { error: 'delete student fail'}
        })
    }
}