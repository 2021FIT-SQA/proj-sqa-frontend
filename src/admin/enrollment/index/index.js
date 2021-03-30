import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Card, Button, Modal, Typography, Row, Col } from 'antd'
import { getEnrollments, postEnrollment, updateEnrollment, deleteEnrollment } from 'redux/actions/enrollment.action'
import { EnrollmentTableComponent } from 'admin/enrollment/components/enrollment-table/EnrollmentTableComponent'
import { EnrollmentEditForm } from 'admin/enrollment/components/enrollment-form/EnrollmentEditForm'
import { EnrollmentCreateForm } from 'admin/enrollment/components/enrollment-form/EnrollmentCreateForm'

const EnrollmentContainer = ({
    getEnrollments,
    postEnrollment,
    updateEnrollment,
    deleteEnrollment,
    enrollment: {
        enrollment,
        enrollments,
        pagination,
        loading,
        error
    }}) => {
    // LOCAL INITIAL STATE
    const [params, _ ] = useState({
        page: 1,
        size: 10,
        keyword: undefined,
        sort: []
    });
    const [isCreateModalOpened, setCreateModalOpen] = useState(false);
    const [isEditModalOpened, setEditModalOpen] = useState(false);
    const [editedEnrollment, setEditedEnrollment] = useState(null);

    useEffect(() => {
        getEnrollments(queryString.stringify(params));
    }, [getEnrollments, params])

    const handlePaginationChange = async (paginate, filters) => {
        await getEnrollments(
            queryString.stringify({
                page: paginate.current,
                size: paginate.pageSize
            })
        )
    }

    const onCreateFormSubmit = async (enrollmentDTO) => {
            await postEnrollment(enrollmentDTO);
            setEditModalOpen(false);
            error 
            ? Modal.error({
                title: "Error",
                content: "Some unexpected errors come. Try later!"
            })
            : Modal.success({
                title: 'Success',
                content: `Successfully created new enrollment}`,
                onOk: async () => {
                    await getEnrollments(queryString.stringify({
                        page: pagination.current,
                        size: pagination.pageSize
                    }));
                }
            });
    }

    const onEditFormSubmit = async (enrollmentDTO) => {
            await updateEnrollment({
                ...enrollmentDTO,
                id: editedEnrollment.id,
                courseReleaseID: editedEnrollment.id
            }, editedEnrollment.id);

            error 
            ? Modal.error({
                title: "Error",
                content: "Some unexpected errors come. Try later!"
            })
            : Modal.success({
                title: 'Success',
                content: `Successfully updated enrollment `,
                onOk: async () => {
                    await getEnrollments(queryString.stringify({
                        page: pagination.current,
                        size: pagination.pageSize
                    }));
                }
            });
    }

    const onEnrollmentDeleted = async(record) => {
        Modal.warning({
          title: "Confirm Deletion",
          content: `Are you sure want to delete enrollment ${record.id}`,
          closable: true,
          maskClosable: true,
          onOk: async () => {
                await deleteEnrollment(record.id);
                error 
                ? Modal.error({
                    title: "Error",
                    content: error.error
                })
                : Modal.success({
                    title: 'Success',
                    content: `Successfully delete enrollment`,
                    onOk: async () => {
                        await getEnrollments(queryString.stringify({
                            page: pagination.current,
                            size: pagination.pageSize
                        }));
                    }
                });
            }
        })
    };
    
    return (
        <div>
            <Card title="Enrollment" style={{overflowX: 'auto'}}>
                <Row>
                    <Col span={24} style={{ marginBottom: "15px" }}>
                        {pagination.total && (
                        <Typography.Text>
                            Found <b>{pagination.total}</b> records
                        </Typography.Text>
                        )}
                    </Col>

                    <Col span={24}>
                        <Button
                        type="primary"
                        onClick={() => {
                            setCreateModalOpen(true)
                        }}
                        >
                            Add Department
                        </Button>
                    </Col>
                </Row>
                <EnrollmentTableComponent
                    enrollments={enrollments}
                    pagination={pagination}
                    onChange={handlePaginationChange}
                    loading={loading}
                    onEnrollmentEdited={(record, _) => {
                       setEditedEnrollment(record);
                       setEditModalOpen(true);
                    }}
                    onEnrollmentDeleted={(record, _) => {
                        onEnrollmentDeleted(record)
                    }}
                />
            </Card>

            <Modal
                title='Create a new enrollment'
                visible={isCreateModalOpened}
                onOk={() => setCreateModalOpen(false)}
                onCancel={() => setCreateModalOpen(false)}
                footer={null}
            >
                <EnrollmentCreateForm onSubmit={onCreateFormSubmit} />
            </Modal>

            <Modal
                title='Edit department'
                visible={isEditModalOpened}
                onOk={() => setEditModalOpen(false)}
                onCancel={() => setEditModalOpen(false)}
                footer={null}
            >
                <EnrollmentEditForm 
                    onSubmit={onEditFormSubmit} 
                    editedEnrollment={editedEnrollment} 
                />
            </Modal>
        </div>
    )
}

EnrollmentContainer.proTypes = {
    getEnrollments: PropTypes.func.isRequired,
    postEnrollment: PropTypes.func.isRequired,
    updateEnrollment: PropTypes.func.isRequired,
    deleteEnrollment: PropTypes.func.isRequired,
    enrollment: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    enrollment: state.enrollment
})
export default connect(mapStateToProps, { getEnrollments, postEnrollment, updateEnrollment, deleteEnrollment })(EnrollmentContainer)
