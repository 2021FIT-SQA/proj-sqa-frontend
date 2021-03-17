import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid';

import { Card, Button, Modal, Typography, Row, Col } from "antd";
import { TeacherTableComponent } from '../teacher/components/teacher-table/TeacherTable'
import { TeacherFilterComponent } from './components/filter/TeacherFilter';
import TeacherForm from './components/teacher-form/TeacherForm';

import { postTeacher, deleteTeacher, updateTeacher } from 'redux/actions/teacher.action'
import teacherApi from 'api/teacherApi';

const TeacherContainer = ({postTeacher, updateTeacher, deleteTeacher}) => {
    // TODO: Build custom loading to be independent on redux
    const [teacherList, setTeacherList] = useState([]);
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        keyword: '',
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [loading, setLoading] = useState(false);
    const [
        isDialogOpened,
        setDialogOpen,
      ] = useState(false);
      const [selectedTeacher, setSelectedTeacher] = useState(null);

    // featch teacher api
    const fetchTeacherList = (paramsString) => {
        try {
            setLoading(previous => true);

            teacherApi.getTeachers(paramsString).then(data => {
                const { content, pageable, totalElements } = data;
                const teacherToDisplay = content.map(ele => {
                    const { username, firstName,lastName, gender, email, phoneNumber, dob, department } = ele;
                    return {
                        key: uuidv4(),
                        username,
                        fullName: `${lastName} ${firstName.split('').splice(0,firstName.indexOf('(')).join('')}`,
                        gender,
                        email,
                        phoneNumber,
                        dob: dob.reverse().join('/'),
                        department: `${department.name} (${department.code})`
                    } 
                })
                setTeacherList(teacherToDisplay);
                setPagination( previous => {
                    return {
                        ...previous,
                        current: pageable.pageNumber + 1,
                        pageSize: pageable.pageSize,
                        total: totalElements
                    }
                })
                setLoading(previous => false)
            })
        } catch (error) {
            throw error
        }
    }

    // did mount every params changes
    useEffect(() => {
        fetchTeacherList(queryString.stringify(params));
    }, [params])

    // TODO: filters on table changing
    const handlePagination = (paginate, filters) => {
        console.log('filter', filters)
        fetchTeacherList(queryString.stringify({
            page: paginate.current,
            size: paginate.pageSize,
            keyword: params.keyword
        }))
    }

    const handleFinish = (values) => {
        const {keyword} = values;
        setParams(previous => {
            return {
                ...previous,
                keyword: keyword
            }
        })
    }
    
    const handleReset =  () => {
        setParams(previous => {
            return {
                ...previous,
                keyword: ''
            }
        })
    }

    const onTeacherFormSubmit = async (teacherDTO) => {
        setLoading(true);
        try {
          // Add new student
          if (selectedTeacher === null) {
            const teacher = await postTeacher(teacherDTO);
            setDialogOpen(false);
            Modal.success({
              title: "Success",
              content: `Successfully created student ${teacher.lastName} ${teacher.firstName} with ID ${teacher.id}`,
            });
          } 
          else { 
            // update student by id
            const teacher = await updateTeacher(teacherDTO, teacherDTO.id);
            setDialogOpen(false);
            Modal.success({
              title: "Success",
              content: `Successfully updated student ${teacher.lastName} ${teacher.firstName} with ID ${teacher.id}`,
            });
            
            // Update students arr with the edited student
            setTeacherList(teacherList.map(std => std.id === teacher.id ? teacher : std));
          } 
        } catch (e) {
            Modal.error({
              title: "Error",
              content: 'Some unexpected errors come. Try later!',
            });
        }
    setLoading(false);
        return;
      }

    return (
        <div>
            <Card>
                <TeacherFilterComponent 
                    keyword={params.keyword}
                    onFinish={handleFinish}
                    onReset={handleReset}

                />
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
                            setSelectedTeacher(null);
                            setDialogOpen(true);
                        }}
                        >
                            Add Student
                        </Button>
                    </Col>
                </Row>

                <TeacherTableComponent 
                    data={teacherList}
                    onChange={handlePagination}
                    loading={loading}
                    pagination={pagination}
                    onTeacherEdited={(_, index) => {
                        setSelectedTeacher(teacherList[index]);
                        setDialogOpen(true);
                    }}
                />
            </Card>
            <Modal
                title={
                    selectedTeacher
                        ? `Edit Student ${selectedTeacher.lastName} ${selectedTeacher.firstName}`
                        : "Create a new Student"
                }
                visible={isDialogOpened}
                onOk={() => {
                setDialogOpen(false);
                }}
                onCancel={() => {
                setDialogOpen(false);
                }}
                footer={null}
            >   
                <TeacherForm 
                    mode={selectedTeacher ? 'edit' : 'create'}
                    onSubmit={onTeacherFormSubmit}
                    selectedTeacher={selectedTeacher}
                />
            </Modal>
        </div>
    )
}

TeacherContainer.propTypes = {
    postTeacher: PropTypes.func.isRequired,
    updateTeacher: PropTypes.func.isRequired,
    deleteTeacher: PropTypes.func.isRequired,
}

export default connect(null, {postTeacher, updateTeacher, deleteTeacher})(TeacherContainer)
