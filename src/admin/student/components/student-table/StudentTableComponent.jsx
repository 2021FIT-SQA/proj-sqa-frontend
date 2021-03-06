import React, { useState } from 'react'
import { Table, Button } from 'antd'

const columns = [
  {
    title: 'Student ID',
    dataIndex: 'studentID',
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
    title: 'Year',
    dataIndex: 'sinceYear'
  },
  {
    title: 'Department',
    dataIndex: 'department'
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Address',
    dataIndex: 'fullAddress',
  },
  {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleAction(record)}>
          Action
        </Button>
      )
    }
];

const handleAction = currentEvent => {
  alert(`Current Event ${currentEvent}`,)
};


export const StudentTableComponent = ({data}) => {

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
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                style={{'marginTop': '1rem'}}
            />            
        </div>
    )
}
