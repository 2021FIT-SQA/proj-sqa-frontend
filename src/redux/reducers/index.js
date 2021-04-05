import { combineReducers } from "redux";
import auth from './auth.reducer';
import student from './student.reducer'
import teacher from './teacher.reducer'
import department from './department.reducer'
import enrollment from './enrollment.reducer'
import courseRelease from './courseRelease.reducer'
import app from './app.reducer'

export default combineReducers({
    app,
    auth,
    student,
    teacher,
    department,
    enrollment,
    courseRelease
})