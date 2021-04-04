import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'

import { Card, Button, Modal, Typography, Row, Col } from 'antd'
import { getCourseReleases } from 'redux/actions/courseRelease.action'
import { CourseReleaseTableComponent } from 'admin/course-release/components/courseReleaseTableComponent'

const CourseReleaseContainer = props => {
    const { getCourseReleases, courseRelease: {courseReleases, pagination, loading}, options } = props;
    // LOCAL INITIAL STATE
    const [params, _ ] = useState({
        page: 1,
        size: 10,
        keyword: undefined,
        sort: []
    });

    useEffect(() => {
        getCourseReleases(queryString.stringify(params), options);
    },[getCourseReleases, params, options])

    const handlePaginationChange = async (paginate, filters) => {
        await getCourseReleases(
            queryString.stringify({
                page: paginate.current,
                size: paginate.pageSize
            }),
            options,
        )
    }

    return (
        <div>
            <Card title="Course Releases" style={{overflowX: 'auto'}}>
                <Row>
                    <Col span={24} style={{ marginBottom: "15px" }}>
                        {pagination.total && (
                        <Typography.Text>
                            Found <b>{pagination.total}</b> records
                        </Typography.Text>
                        )}
                    </Col>
                </Row>
                <CourseReleaseTableComponent
                    courseReleases={courseReleases}
                    pagination={pagination}
                    onChange={handlePaginationChange}
                    loading={loading}
                />
            </Card>
        </div>
    )
}

CourseReleaseContainer.propTypes = {
    getCourseReleases: PropTypes.func.isRequired,
    courseRelease: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    courseRelease: state.courseRelease
})
export default connect(mapStateToProps, { getCourseReleases })(CourseReleaseContainer)
