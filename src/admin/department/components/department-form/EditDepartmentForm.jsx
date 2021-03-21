import React from 'react'
import { Formik } from "formik";
import {
    Form,
    Input,
    SubmitButton,
    ResetButton,
} from "formik-antd";

export const EditDepartmentForm = ({ onSubmit, editedDepartment }) => {
    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: editedDepartment.name,
                code: editedDepartment.code
            }}
            onSubmit={async (values) => await onSubmit(values)}
        >
            {({values, handleSubmit, isSubmiting, errors, touched}) => {
                return (
                    <Form layout="vertical">
                        <Form.Item
                            name="name"
                            required
                            label="Department Name"
                            style={{width: "100%"}}
                        >
                            <Input
                                name="name"
                                placeholder="Enter department name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            required
                            label="Department Code"
                            style={{width: "100%"}}
                        >
                            <Input
                                name="code"
                                placeholder="Enter department code"
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
