import React, { useState } from "react";
import { Table, Button } from "antd";
import { useLocation, Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

export const StudentTableComponent = ({
  students,
  pagination,
  onChange,
  onStudentEdit,
  onStudentDelete,
  loading,
}) => {
  // Transform
  students = students.map((student, index) => {
    return {
      index,
      key: uuidv4(),
      studentID: student.username,
      fullName: `${student.lastName} ${student.firstName}`,
      gender: student.gender,
      email: student.email,
      sinceYear: student.sinceYear,
      department: student.department.code,
      phoneNumber: student.phoneNumber,
      fullAddress: student.fullAddress,
      departmentID: student.department.id,
    };
  });

  let location = useLocation();

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
            render: (fullName, record) => (
              <Link to={`${location.pathname}/detail/${record.studentID}`}>{fullName}</Link>
            )
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
              <div>
                <Button
                  style={{ marginBottom: "3px", width: "100%" }}
                  type="primary"
                  onClick={() => {
                    onStudentEdit(record, record.index);
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ width: "100%" }}
                  danger
                  type="primary"
                  onClick={() => {
                    onStudentDelete(record, record.index);
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
        dataSource={students}
        style={{ marginTop: "1rem" }}
        pagination={pagination}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};
