import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCourseReleases } from 'redux/actions/courseRelease.action'

const CourseReleaseContainer = props => {
    const { getCourseReleases } = props;

    useEffect(() => {
        getCourseReleases();
    },[])

    return (
        <div>
            somthings
        </div>
    )
}

CourseReleaseContainer.propTypes = {
    getCourseReleases: PropTypes.func.isRequired,
}

export default connect(null, { getCourseReleases })(CourseReleaseContainer)
