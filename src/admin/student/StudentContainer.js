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
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [keyword, setKeyword] = useState(null);

  async function fetchStudentList(antCurrentPage, pageSize, keyword) {
    try {
      const paramsString = queryString.stringify({
        page: antCurrentPage - 1,
        size: pageSize,
        keyword: keyword
      });
      console.log(paramsString)
      const data = await studentApi.getPaginatedStudents(paramsString);
      const { content, pageable, totalElements } = data;

      const studentsToDisplay = content.map((student) => {
        const { username, lastName, firstName, gender, email, sinceYear, department, phoneNumber, fullAddress} = student;
        return {
          key: uuidv4(),
          studentID: username,
          fullName: `${lastName} ${firstName}`,
          gender: gender.toLowerCase(),
          email,
          sinceYear,
          department: department.code,
          phoneNumber,
          fullAddress
        }
      });
      setStudentData(studentsToDisplay);
      setPagination({
        current: pageable.pageNumber + 1,
        pageSize: pageable.pageSize,
        total: totalElements,
      })
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchStudentList(pagination.current, pagination.pageSize, keyword)
  },[]);

  const handleFinish = (values) => {
    const { keyword } = values;
    setKeyword(previous => keyword)
    fetchStudentList(1, 10, keyword)
  };

  const handleReset =  () => {
    setKeyword(null)
    fetchStudentList(1, 10, "")
  }

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    fetchStudentList(current, pageSize, keyword);
  }
  return (
    <div>
        <Card title='Students' style={{'overflowX': 'auto'}}>
            <FilterComponent keyword={keyword} onFinish={handleFinish} onReset={handleReset} />
            <StudentTableComponent data={studentData} onChange={handleTableChange} pagination={pagination} />
        </Card>    
        <CreateStudentForm onSubmit={(createStudentDTO) => {
          // TODO: Call backend
          postStudent(createStudentDTO)
        }}/>                   
    </div>
  )
}

StudentContainer.propTypes = {
  postStudent: PropTypes.func.isRequired,
}

export default connect(null, { postStudent })(StudentContainer)
