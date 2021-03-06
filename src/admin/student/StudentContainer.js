import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Card } from 'antd'
import { FilterComponent, StudentTableComponent } from './components'

import { getStudents } from 'redux/actions/student.action'

const data = [
  {
    key: '1',
    studentID: '1801040111',
    fullName: 'Nguyen Van Huyen',
    gender: 'Male',
    email: '1801040111@s.hanu.edu.vn',
    class: '4C18',
    department: 'FIT',
    dob: '09/09/2000',
    phoneNumber: '0967205036',
    address: 'Thanh Xuan, Ha Noi'
  },
  {
    key: '2',
    studentID: '1801040222',
    fullName: 'Pham Tien Thanh',
    gender: 'Male',
    email: '1801040222@s.hanu.edu.vn',
    class: '4C18',
    department: 'FIT',
    dob: '02/09/2000',
    phoneNumber: '121212121121',
    address: 'Thanh Xuan, Ha Noi'
  },
  {
    key: '3',
    studentID: '1801040123',
    fullName: 'Tang Ba Minh',
    gender: 'Male',
    email: '1801040123@s.hanu.edu.vn',
    class: '4C18',
    department: 'FIT',
    dob: '03/09/2000',
    phoneNumber: '01212121212',
    address: 'Thanh Xuan, Ha Noi'
  },
  {
    key: '4',
    studentID: '1801040213',
    fullName: 'Do Thi Ngan',
    gender: 'Female',
    email: '1801040213@s.hanu.edu.vn',
    class: '4C18',
    department: 'FIT',
    dob: '05/09/2000',
    phoneNumber: '01234567889',
    address: 'Thanh Xuan, Ha Noi'
  },
  {
    key: '5',
    studentID: '1801040001',
    fullName: 'Nguyen Thi Thuy Duong',
    gender: 'Male',
    email: '1801040001@s.hanu.edu.vn',
    class: '4C18',
    department: 'FIT',
    dob: '08/08/2000',
    phoneNumber: '09362732673',
    address: 'Thanh Xuan, Ha Noi'
  },
//   {
//     key: '6',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '7',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '8',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '9',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '10',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '11',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '12',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '13',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '14',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '15',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '16',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
//   {
//     key: '1',
//     studentID: '1801040111',
//     fullName: 'Nguyen Van Huyen',
//     gender: 'Male',
//     email: '1801040111@s.hanu.edu.vn',
//     class: '4C18',
//     department: 'FIT',
//     dob: '09/09/2000',
//     phoneNumber: '0967205036',
//     address: 'Thanh Xuan, Ha Noi'
//   },
];

const StudentContainer = ({ student: {students, loading}, getStudents}) => {

  const studentsToDisplay = students.map((student, index = 1) => {
    const { username, lastName, firstName, gender, email, sinceYear, department, phoneNumber, fullAddress} = student;
    return {
      key: index,
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
  
  const [studentData, setStudentData] = useState(studentsToDisplay);
  const [filters, setFilters] = useState({
    page: 0,
    size: 10,
    sort: 'ASC',
  })

  const paramsString = queryString.stringify(filters);

  useEffect(() => {
    getStudents(paramsString);
  },
  [getStudents, paramsString]);


    // Search function
  const handleSearch = searchText => {
    const filteredData = studentData.filter(({ fullName }) => {
      fullName = fullName.toLowerCase();
      return fullName.includes(searchText);
    });
    setStudentData([...filteredData])
  };
  return (
    <div>
        <Card title='Students' style={{'overflowX': 'auto'}}>
            <FilterComponent onSearch={handleSearch} />
            <StudentTableComponent data={studentData} />
        </Card>                       
    </div>
  )
}

StudentContainer.propTypes = {
  getStudents: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  student: state.student
})

export default connect(mapStateToProps, {getStudents})(StudentContainer)