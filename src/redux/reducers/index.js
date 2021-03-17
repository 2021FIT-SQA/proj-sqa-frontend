import { combineReducers } from "redux";
import auth from './auth.reducer';
import student from './student.reducer'
import teacher from './teacher.reducer'
import department from './department.reducer'
export default combineReducers({
    auth,
    student,
    teacher,
    department
})