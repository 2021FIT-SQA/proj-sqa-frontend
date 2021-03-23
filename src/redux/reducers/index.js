import { combineReducers } from "redux";
import auth from './auth.reducer';
import student from './student.reducer'
import teacher from './teacher.reducer'
import department from './department.reducer'
import enrollment from './enrollment.reducer'
import courseRelease from './courseRelease.reducer'
export default combineReducers({
    auth,
    student,
    teacher,
    department,
    enrollment,
    courseRelease
})