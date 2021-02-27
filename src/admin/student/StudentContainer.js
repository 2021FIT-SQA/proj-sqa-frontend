import React, {useState} from 'react'
import { Card } from 'antd'
import { FilterComponent, StudentTableComponent } from './components'

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

const StudentContainer = () => {

    const [tableData, setTableData] = useState(data);
    console.log(tableData)
    // Search function
    const handleSearch = searchText => {
        const filteredData = tableData.filter(({ fullName }) => {
          fullName = fullName.toLowerCase();
          return fullName.includes(searchText);
        });
        
        setTableData([...filteredData])
      };

    return (
        <div>
            <Card title='Students' style={{'overflowX': 'auto'}}>
                <FilterComponent onSearch={handleSearch} />
                <StudentTableComponent data={tableData} />
            </Card>                       
        </div>
    )
}
export default StudentContainer