import React from 'react'
import { Table, Button } from 'antd'
import { v4 as uuidv4 } from "uuid";

export const EnrollmentTableComponent = ({
    enrollments,
    pagination,
    onChange,
    onEnrollmentEdited,
    onEnrollmentDeleted,
    loading
}) => {
    // transform data
    enrollments = enrollments.map((ele, index) => {
        return {
            key: uuidv4(),
            id: ele.id,
            studentID: ele.student.username,
            studentName: `${ele.student.lastName} ${ele.student.firstName}`,
            department: ele.student.department.name,
            course: `${ele.courseRelease.course.name} (${ele.courseRelease.course.department.code})`,
            courseRelease:  `${ele.courseRelease.course.season} ${ele.courseRelease.course.releaseYear}`,
            mark: (ele.attendanceMark*0.1 + ele.midtermMark*0.3 + ele.finalMark*0.6).toFixed(2),
            teacher:` ${ele.courseRelease.teacher.lastName} ${ele.courseRelease.teacher.firstName}`
        }
    })

    return (
        <Table
            columns={[
            {
                title: "Index",
                dataIndex: "id",
            },
            {
                title: "Student ID",
                dataIndex: "studentID",
            },
            {
                title: "Student Name",
                dataIndex: "studentName",
            },
            {
                title: "Deparment",
                dataIndex: "department",
            },
            {
                title: "Attending Course",
                dataIndex: "course",
            },
            {
                title: "Mark",
                dataIndex: "mark",
            },
            {
                title: "Lecturer",
                dataIndex: "teacher",
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => (
                  <div style={{display: 'flex', flexDirection:'column'}}>
                    <Button
                      style={{ marginBottom: "3px", width: "100%" }}
                      type="primary"
                      onClick={() => {
                        onEnrollmentEdited(record, record.index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ width: "100%" }}
                      danger
                      type="primary"
                      onClick={() => {
                        onEnrollmentDeleted(record, record.index);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ),
              },
            ]}
            rowKey={(record) => record.key}
            dataSource={enrollments}
            style={{ marginTop: "1rem" }}
            pagination={pagination}
            onChange={onChange}
            loading={loading}
        />
    )
}

