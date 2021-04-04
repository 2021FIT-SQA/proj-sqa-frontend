import React, { useState } from 'react'
import { Table, Tag } from 'antd'
import { v4 as uuidv4 } from "uuid";
import { useLocation, Link } from 'react-router-dom';


export const CourseReleaseTableComponent = ({
    courseReleases,
    pagination,
    onChange,
    loading
}) => {
    // transform data
    courseReleases = courseReleases.map((ele, index) => {
        return {
            key: uuidv4(),
            id: ele.id,
            index: index + 1,
            courseName: `${ele.course.name} (${ele.course.registrationCode})`,
            release: `${ele.season} - ${ele.releaseYear}`,
            department: `${ele.course.department.name} - ${ele.course.department.code}`,
            teacher: `${ele.teacher.lastName} ${ele.teacher.firstName}`,
            isActive: ele.isActive
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
                title: "Course Name",
                dataIndex: "courseName",
            },
            {
                title: "Release",
                dataIndex: "release",
                render: (release, record) => (
                    <Link to={`/admin/courseReleases/detail/${record.id}`}>{release}</Link>
                ),
            },
            {
                title: "Department",
                dataIndex: "department",
            },
            {
                title: "Lecturer",
                dataIndex: "teacher",
            },
            {
                title: "Active",
                dataIndex: "isActive",
                render: (isActive) => {
                    const color = isActive ? 'green' : 'grey';
                    const text = isActive ? 'ACTIVE' : 'OFF'
                    return (
                        <Tag color={color}>
                            {text}
                        </Tag>
                    )
                }
            },
            ]}
            dataSource={courseReleases}
            style={{ marginTop: "1rem" }}
            pagination={pagination}
            onChange={onChange}
            loading={loading}
        />
    )
}

