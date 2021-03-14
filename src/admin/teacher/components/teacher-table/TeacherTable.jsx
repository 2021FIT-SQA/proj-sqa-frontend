import React, { useState } from 'react'
import { Table, Button } from 'antd'

const columns = [
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
];

export const TeacherTableComponent = ({data, pagination, loading, onChange}) => {

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
                columns={columns}
                dataSource={data}
                style={{'marginTop': '1rem'}}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
            />            
        </div>
    )
}
