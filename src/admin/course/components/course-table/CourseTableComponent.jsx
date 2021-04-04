import React, { useState } from "react";
import { Table, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import convertDateTimeArrToString from "utils/dateConverter";
import { useLocation, Link } from 'react-router-dom';

export const CourseTableComponent = ({
  courses,
  pagination,
  onChange,
  onCourseEdit,
  onCourseDelete,
  loading,
}) => {
  let location = useLocation();

  // Transform
  courses = courses.map((course, index) => {
    return {
      index,
      key: uuidv4(),
      courseID: course.id,
      name: course.name,
      registrationCode: course.registrationCode,
      code: course.code,
      requiredSchoolYear: course.requiredSchoolYear,
      department: course.department.code,
      activeReleasesCount: course.activeReleasesCount,
      createdAt: convertDateTimeArrToString(course.createdAt, "DATE"),
      updatedAt: convertDateTimeArrToString(course.updatedAt, "DATE"),
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
            title: "Course ID",
            dataIndex: "courseID",
          },
          {
            title: "Registration Code",
            dataIndex: "registrationCode",
          },
          {
            title: "Name",
            dataIndex: "name",
            render: (name, record) => (
              <Link to={`${location.pathname}/detail/${record.courseID}`}>{name}</Link>
            )
          },
          {
            title: "Year",
            dataIndex: "requiredSchoolYear",
          },
          {
            title: "Department",
            dataIndex: "department",
          },
          {
            title: "Active Releases Count",
            dataIndex: "activeReleasesCount",
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
          },
          {
            title: "Updated At",
            dataIndex: "updatedAt",
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
                    onCourseEdit(record, record.index);
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ width: "100%" }}
                  danger
                  type="primary"
                  onClick={() => {
                    onCourseDelete(record, record.index);
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
        dataSource={courses}
        style={{ marginTop: "1rem" }}
        pagination={pagination}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};
