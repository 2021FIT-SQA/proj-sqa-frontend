import React from 'react'
import { Formik } from "formik";
import {
    Form,
    Input,
    SubmitButton,
    ResetButton,
} from "formik-antd";

export const EnrollmentEditForm = ({ onSubmit, editedEnrollment }) => {
    const {
        studentID,
        studentName,
        department,
        course,
        courseRelease,
        attendanceMark,
        midtermMark,
        finalMark,
        teacher
    } = editedEnrollment;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                studentID,
                studentName,
                department,
                course,
                courseRelease,
                attendanceMark,
                midtermMark,
                finalMark,
                teacher
            }}
            onSubmit={async (values) => await onSubmit(values)}
        >
            {({values, handleSubmit, isSubmiting, errors, touched}) => {
                return (
                    <Form layout="vertical">
                        <Form.Item
                            name="studentID"
                            required
                            label="Student ID"
                            style={{width: "100%"}}
                        >
                            <Input
                                disabled
                                name="studentID"
                                placeholder="Enter student ID"
                            />
                        </Form.Item>

                        <Form.Item
                            name="studentName"
                            required
                            label="Student Name"
                            style={{width: "100%"}}
                        >
                            <Input
                                disabled
                                name="studentName"
                                placeholder="Enter student name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="department"
                            required
                            label="Department"
                            style={{width: "100%"}}
                        >
                            <Input
                                disabled
                                name="department"
                                placeholder="Enter department name"
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="course"
                            required
                            label="Attending Course"
                            style={{width: "100%"}}
                        >
                            <Input
                                disabled
                                name="course"
                                placeholder="Enter attending course"
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="courseRelease"
                            required
                            label="Release"
                            style={{width: "100%"}}
                        >
                            <Input
                                disabled
                                name="courseRelease"
                                placeholder="Enter course release"
                            />
                        </Form.Item>

                        <Form.Item
                            name="attendanceMark"
                            required
                            label="Attendance Mark"
                            style={{width: "100%"}}
                        >
                            <Input
                                name="attendanceMark"
                                placeholder="Enter attendance mark"
                            />
                        </Form.Item>

                        <Form.Item
                            name="midtermMark"
                            required
                            label="Midterm Mark"
                            style={{width: "100%"}}
                        >
                            <Input
                                name="midtermMark"
                                placeholder="Enter midterm mark"
                            />
                        </Form.Item>

                        <Form.Item
                            name="finalMark"
                            required
                            label="Final Mark"
                            style={{width: "100%"}}
                        >
                            <Input
                                name="finalMark"
                                placeholder="Enter final mark"
                            />
                        </Form.Item>

                        <Form.Item
                            name="teacher"
                            required
                            label="Lecturer"
                            style={{width: "100%"}}
                        >
                            <Input
                                name="teacher"
                                placeholder="Enter teacher name"
                            />
                        </Form.Item>

                        <SubmitButton style={{ width: "100%", marginBottom: "10px"}}>
                            Update
                        </SubmitButton>
                        <ResetButton style={{ width: "100%"}}>
                            Reset
                        </ResetButton>
                    </Form>
                )
            }}
        </Formik>
    )
}
