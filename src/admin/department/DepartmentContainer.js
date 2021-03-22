import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Card, Button, Modal, Typography, Row, Col } from 'antd'
import { getDepartments, postDepartment, updateDepartment, deleteDepartment } from 'redux/actions/department.action'
import { DepartmentTableComponent } from 'admin/department/components/department-table/DepartmentTableComponent'
import { CreateDepartmentForm } from 'admin/department/components/department-form/CreateDepartmentForm'
import { EditDepartmentForm } from 'admin/department/components/department-form/EditDepartmentForm'
import { DepartmentFilterComponent } from 'admin/department/components/department-filter/DepartmentFilterComponent'
import ErrorList from 'antd/lib/form/ErrorList'


const DepartmentContainer = (props) => {
    const { getDepartments, postDepartment, updateDepartment, deleteDepartment, department, departments, pagination, loading } = props;

    // LOCAL INITIAL STATE
    const [params, setParams ] = useState({
        page: 1,
        size: 10,
        keyword: undefined,
        sort: []
    });
    const [isCreateModalOpened, setCreateModalOpen] = useState(false);
    const [isEditModalOpened, setEditModalOpen] = useState(false);
    const [editedDepartment, setEditedDepartment] = useState(null);

    useEffect(() => {
        getDepartments(queryString.stringify(params));
    }, [getDepartments, params])

    const handlePaginationChange = async (paginate, filters) => {
        await getDepartments(
            queryString.stringify({
                page: paginate.current,
                size: paginate.pageSize
            })
        )
    }

    const onCreateFormSubmit = async (departmentDTO) => {
        try {
            await postDepartment(departmentDTO);
            await getDepartments(queryString.stringify({
                page: pagination.current,
                size: pagination.pageSize
            }));
            setCreateModalOpen(false);
            Modal.success({
                title: 'Success',
                content: `Successfully created department ${department.name} with code ${department.code}`
            });
        } catch (error) {
            console.log(error);
            setCreateModalOpen(false);
            Modal.error({
                title: "Error",
                content: "Some unexpected errors come. Try later!"
            });
        }
    }

    const onEditFormSubmit = async (departmentDTO) => {
        try {
            await updateDepartment(departmentDTO, editedDepartment.id);
            setEditModalOpen(false);
            Modal.success({
                title: 'Success',
                content: `Successfully updated department ${department.name} with code ${department.code}`
            })
        } catch (error) {
            console.log(error);
            setEditModalOpen(false);
            Modal.error({
                title: "Error",
                content: "Some unexpected errors come. Try later!"
            });
        }
    }

    const onDepartmentDelete = async(record) => {
        Modal.warning({
          title: "Confirm Deletion",
          content: `Are you sure want to delete department ${record.code}`,
          closable: true,
          maskClosable: true,
          onOk: async () => {
            try {
                await deleteDepartment(record.id);
                await getDepartments(queryString.stringify({
                    page: pagination.current,
                    size: pagination.pageSize
                }));
                Modal.success({
                    title: 'Delete successfully',
                    content: `Successfully deleted department ${record.name}`
                });
            } catch (error) {
                console.log(error);
                Modal.error({
                    title: "Delete failed",
                    content: 'Errors',
                });
            }
          },
        })
    };

    // const handleSearch = (values) => {
    //     setParams( previous => ({
    //         ...previous,
    //         keyword: values.keyword,
    //         sort: values.sort
    //     }))
    // }

    // const handleResetFilter = () => {
    //     setParams(pre => ({
    //         ...pre,
    //         keyword: undefined,
    //         sort: []
    //     }))
    // }
    
    return (
        <div>
            <Card title="Department" style={{overflowX: 'auto'}}>
                {/* <DepartmentFilterComponent 
                    keyword={params.keyword}
                    onFinish={handleSearch}
                    onReset={handleResetFilter}
                /> */}
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
                <DepartmentTableComponent
                    departments={departments}
                    pagination={pagination}
                    onChange={handlePaginationChange}
                    loading={loading}
                    onDepartmentEdit={(record, _) => {
                       setEditedDepartment(record);
                       setEditModalOpen(true);
                    }}
                    onDepartmentDelete={(record, _) => {
                        onDepartmentDelete(record)
                    }}
                />
            </Card>

            <Modal
                title='Create a new department'
                visible={isCreateModalOpened}
                onOk={() => setCreateModalOpen(false)}
                onCancel={() => setCreateModalOpen(false)}
                footer={null}
            >
                <CreateDepartmentForm onSubmit={onCreateFormSubmit} />
            </Modal>

            <Modal
                title='Edit department'
                visible={isEditModalOpened}
                onOk={() => setEditModalOpen(false)}
                onCancel={() => setEditModalOpen(false)}
                footer={null}
            >
                <EditDepartmentForm 
                    onSubmit={onEditFormSubmit} 
                    editedDepartment={editedDepartment} 
                />
            </Modal>
        </div>
    )
}

DepartmentContainer.proTypes = {
    getDepartments: PropTypes.func.isRequired,
    postDepartment: PropTypes.func.isRequired,
    updateDepartment: PropTypes.func.isRequired,
    deleteDepartment: PropTypes.func.isRequired,
    department: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    department: state.department.department,
    departments: state.department.departments,
    pagination: state.department.pagination,
    loading: state.department.loading
})
export default connect(mapStateToProps, { getDepartments, postDepartment, updateDepartment, deleteDepartment })(DepartmentContainer)
