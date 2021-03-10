import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'antd'

import { FilterComponent, StudentTableComponent } from './components'

import studentApi from 'api/studentApi'

const StudentContainer = () => {

  // STATE HANDLING
  const [studentData, setStudentData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [keyword, setKeyword] = useState(null);

  async function fetchStudentList(antCurrentPage, pageSize, keyword) {
    try {

      //calling getStudents() function from student action 
      // => got undefine dispite of being connected mapDispatchToProps
      // => will refactor code using redux later
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

  // @BUG: with each given keyword => only get the first page with 10 items
  const handleFinish = (values) => {
    // hanlde out search here
    const { keyword } = values;
    setKeyword(previous => keyword)
    // @BUG: cannot set pagination to initial state ????
    // setPagination({
    //   ...pagination,
    //   current: 1,
    //   pageSize: 10
    // })
    
    // Garbage code -> not utility :<
    fetchStudentList(1, 10, keyword)
  };

  const handleReset =  () => {
    // clear the filter
    // @BUG: keyword is set to be null is only available for FilterComponent
    //       local state is kept
    setKeyword(null)
    // @BUG: cannot set pagination to initial state ????
    // setPagination({
    //   ...pagination,
    //   current: 1,
    //   pageSize: 10
    // })
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
    </div>
  )
}

export default StudentContainer