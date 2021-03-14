import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid';

import { Card } from 'antd'
import { FilterComponent, StudentTableComponent } from './components'
import CreateStudentForm from './components/student-form/CreateStudentForm';

import { postStudent } from 'redux/actions/student.action'
import studentApi from 'api/studentApi'

const StudentContainer = ({ postStudent }) => {

  // STATE HANDLING
  const [studentData, setStudentData] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    keyword: '',
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
})
  const [loading, setLoading] = useState(false)

  const fetchStudentList = (paramsString) => {
    try {
      setLoading(pre => true);
      studentApi.getPaginatedStudents(paramsString).then(data => {
        const { content, pageable, totalElements } = data;
        const studentsToDisplay = content.map((student) => {
          const { username, lastName, firstName, gender, email, sinceYear, department, phoneNumber, fullAddress} = student;
          return {
            key: uuidv4(),
            studentID: username,
            fullName: `${lastName} ${firstName}`,
            gender,
            email,
            sinceYear,
            department: `${department.name} (${department.code})`,
            phoneNumber,
            fullAddress
          }
        });
        setStudentData(studentsToDisplay);
        setPagination(pre => {
          return {
            ...pre,
            current: pageable.pageNumber + 1,
            pageSize: pageable.pageSize,
            total: totalElements
          }
        })
        setLoading(pre => false)
      })
    } catch (error) {
        throw error;
    }
  }

  useEffect(() => {
    fetchStudentList(queryString.stringify(params))
  }, [params]);

  const handleFinish = (values) => {
    setParams(previous => {
      return {
        ...previous,
        keyword: values.keyword
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

  // TODO: filter some columns
  const handleTableChange = (pagination, filters) => {
    console.log(filters)
    fetchStudentList(queryString.stringify({
      page: pagination.current,
      size: pagination.pageSize,
      keyword: params.keyword
    }));
  }
  return (
    <div>
        <Card title='Students' style={{'overflowX': 'auto'}}>
            <FilterComponent keyword={params.keyword} onFinish={handleFinish} onReset={handleReset} />
            <StudentTableComponent data={studentData} onChange={handleTableChange} pagination={pagination} loading={loading} />
        </Card>    
        <CreateStudentForm onSubmit={(createStudentDTO) => {
          // TODO: Call backend
          console.log(createStudentDTO)
          // postStudent(createStudentDTO)
        }}/>                   
    </div>
  )
}

StudentContainer.propTypes = {
  postStudent: PropTypes.func.isRequired,
}

export default connect(null, { postStudent })(StudentContainer)
