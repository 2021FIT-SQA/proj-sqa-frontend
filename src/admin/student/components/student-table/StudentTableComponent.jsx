import React, { useState } from 'react'
import { Table, Button } from 'antd'

export const StudentTableComponent = ({data, pagination, onChange, onStudentEdit, loading}) => {

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
              columns={[
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
                      <Button type="primary" onClick={() => { onStudentEdit(record, record.index); }}>
                        Edit
                      </Button>
                    )
                  }
                ]}
                rowKey={record => record.key}
                rowSelection={rowSelection}
                dataSource={data}
                style={{'marginTop': '1rem'}}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
            />            
        </div>
    )
}
