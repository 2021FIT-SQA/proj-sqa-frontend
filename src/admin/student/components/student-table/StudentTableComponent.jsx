import React, { useState } from "react";
import { Table, Button } from "antd";

import { v4 as uuidv4 } from "uuid";

export const StudentTableComponent = ({
  students,
  pagination,
  onChange,
  onStudentEdit,
  loading,
}) => {
  // Transform
  students = students.map((student, index) => {
    return {
      index,
      key: uuidv4(),
      studentID: student.username,
      fullName: `${student.lastName} ${student.firstName}`,
      gender: student.gender.toLowerCase(),
      email: student.email,
      sinceYear: student.sinceYear,
      department: student.department.code,
      phoneNumber: student.phoneNumber,
      fullAddress: student.fullAddress,
      departmentID: student.department.id,
    };
});

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys([...selectedRowKeys]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <Table
        columns={[
          {
            title: "Student ID",
            dataIndex: "studentID",
          },
          {
            title: "Name",
            dataIndex: "fullName",
          },
          {
            title: "Gender",
            dataIndex: "gender",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Year",
            dataIndex: "sinceYear",
          },
          {
            title: "Department",
            dataIndex: "department",
          },
          {
            title: "Phone",
            dataIndex: "phoneNumber",
          },
          {
            title: "Address",
            dataIndex: "fullAddress",
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Button
                type="primary"
                onClick={() => {
                  onStudentEdit(record, record.index);
                }}
              >
                Edit
              </Button>
            ),
          },
        ]}
        rowKey={(record) => record.key}
        rowSelection={rowSelection}
        dataSource={students}
        style={{ marginTop: "1rem" }}
        pagination={pagination}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};
