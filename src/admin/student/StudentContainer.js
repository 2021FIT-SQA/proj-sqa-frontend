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

  async function fetchStudentList(antCurrentPage, pageSize) {
    try {

      //calling getStudents() function from student action 
      // => got undefine dispite of being connected mapDispatchToProps
      // => will refactor code using redux later
      const paramsString = queryString.stringify({
        page: antCurrentPage - 1,
        size: pageSize,
      });
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
    fetchStudentList(pagination.current, pagination.pageSize)
  },[]);

    // Search function
  const handleSearch = searchText => {
    const filteredData = studentData.filter(({ fullName }) => {
      fullName = fullName.toLowerCase();
      return fullName.includes(searchText);
    });
    setStudentData([...filteredData])
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    // setPagination(pagination);
    fetchStudentList(current, pageSize);
  }
  return (
    <div>
        <Card title='Students' style={{'overflowX': 'auto'}}>
            <FilterComponent onSearch={handleSearch} />
            <StudentTableComponent data={studentData} onChange={handleTableChange} pagination={pagination} />
        </Card>                       
    </div>
  )
}

export default StudentContainer