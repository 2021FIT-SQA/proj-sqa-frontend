import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudent } from '../../../redux/actions/student.action';
import StudentInfo from '../components/student-information';

const StudentDetailContainer = ({ getStudent, student, loading, location}) => {
    
    const params = location.pathname.split('/').pop();

    useEffect(() => {
        async function fetchStudent() {
            await getStudent(params)
        }
        fetchStudent();
    }, [getStudent, params]);
    
    return (
        <div>
            <StudentInfo student={student} loading={loading} />
        </div>
    )
}

StudentDetailContainer.propTypes = {
    getStudent: PropTypes.func.isRequired,
    student: PropTypes.object,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    student: state.student.student,
    loading: state.student.loading
})

export default connect(mapStateToProps, { getStudent })(StudentDetailContainer)
