import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudent } from '../../../redux/actions/student.action';

const StudentDetailContainer = ({ getStudent, student, loading, location}) => {
    
    const params = location.pathname.split('/').pop();

    useEffect(() => {
        getStudent(params);
    }, [getStudent, params]);

    return (
        <div>
            StudentDetail works....
        </div>
    )
}

StudentDetailContainer.propTypes = {
    getStudent: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    loading: PropTypes.bool,
}

const mapStateToProps = state => ({
    student: state.student.student,
    loading: state.student.loading
})

export default connect(mapStateToProps, { getStudent })(StudentDetailContainer)
