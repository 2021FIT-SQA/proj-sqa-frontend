import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { v4 as uuidv4 } from "uuid";

export const DepartmentTableComponent = ({
    departments,
    pagination,
    onChange,
    onDepartmentEdit,
    onDepartmentDelete,
    loading
}) => {
    // transform data
    departments = departments.map((ele, index) => {
        return {
            key: uuidv4(),
            id: ele.id,
            index: index + 1,
            name: ele.name,
            code: ele.code,
        }
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys([...selectedRowKeys]);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Table
            columns={[
            {
                title: "Index",
                dataIndex: "id",
            },
            {
                title: "Name",
                dataIndex: "name",
            },
            {
                title: "Code",
                dataIndex: "code",
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => (
                  <div style={{display: 'flex', flexDirection:'column'}}>
                    <Button
                      style={{ marginBottom: "3px", width: "50%" }}
                      type="primary"
                      onClick={() => {
                        onDepartmentEdit(record, record.index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ width: "50%" }}
                      danger
                      type="primary"
                      onClick={() => {
                        onDepartmentDelete(record, record.index);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ),
              },
            ]}
            rowKey={(record) => record.key}
            rowSelection={rowSelection}
            dataSource={departments}
            style={{ marginTop: "1rem" }}
            pagination={pagination}
            onChange={onChange}
            loading={loading}
        />
    )
}

