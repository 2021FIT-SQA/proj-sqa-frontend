import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { v4 as uuidv4 } from "uuid";

export const TeacherTableComponent = ({
  teachers,
  pagination,
  onChange,
  onTeacherEdited,
  onTeacherDelete,
  loading
}) => {

    teachers = teachers.map((teacher, index) => {
      return {
        index,
        key: uuidv4(),
        username: teacher.username,
        fullName: `${teacher.lastName} ${teacher.firstName}`,
        gender: teacher.gender,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        dob: teacher.dob.reverse().join('/'),
        department: `${teacher.department.name} (${teacher.department.code})`
    } 
    })


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys([...selectedRowKeys])
    }

    const rowSelection = {
       selectedRowKeys,
       onChange: onSelectChange
    }
    return (
        <div>
            <Table
                rowKey={record => record.key}
                rowSelection={rowSelection}
                columns={[
                  {
                    title: 'Teacher ID',
                    dataIndex: 'username',
                  },
                  {
                    title: 'Name',
                    dataIndex: 'fullName',
                  },
                  {
                    title: 'Gender',
                    dataIndex: 'gender',
                  },
                  {
                    title: 'Email',
                    dataIndex: 'email',
                  },
                  {
                    title: 'Phone',
                    dataIndex: 'phoneNumber'
                  },
                  {
                    title: 'Birthday',
                    dataIndex: 'dob'
                  },
                  {
                    title: 'Department',
                    dataIndex: 'department',
                    filters: [
                      { text: 'FIT', value: 'FIT' },
                      { text: 'FMT', value: 'FMT' },
                    ]
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (text, record) => (
                      <div>
                        <Button
                          style={{ marginBottom: "3px", width: "100%" }}
                          type="primary"
                          onClick={() => {
                            onTeacherEdited(record, record.index);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ width: "100%" }}
                          danger
                          type="primary"
                          onClick={() => {
                            onTeacherDelete(record, record.index);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    ),
                  },
                ]}
                dataSource={teachers}
                style={{'marginTop': '1rem'}}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
            />            
        </div>
    )
}
