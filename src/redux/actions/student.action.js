import studentApi from '../../api/studentApi'
import {
    GET_ALL_STUDENTS,
    GET_STUDENT_DETAIL
} from '../constants/constants.action'

// GET ALL PAGINATED STUDENTS
export const getStudents = (paramsString) => async dispatch => {
    const res = await studentApi.getPaginatedStudents(paramsString);
    dispatch({
        type: GET_ALL_STUDENTS,
        payload: res
    })   
}