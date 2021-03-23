import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  SubmitButton,
  ResetButton,
  Select,
  InputNumber,
} from "formik-antd";
import { Formik } from "formik";
import moment from "moment";
import departmentApi from "api/departmentApi";
import courseApi from "api/courseApi";


const CourseForm = ({ onSubmit, selectedCourse }) => {
  const [departments, setDepartments] = useState(null);

  selectedCourse &&
    (function convertInitialValuesToDTO() {
      selectedCourse.departmentID = selectedCourse.department.id;
    })();

  useEffect(() => {
    departmentApi.getAllDepartments().then((result) => {
      setDepartments(result);
    });
  }, []);

  const checkRegistrationCodeUnique = async (code) => {
    return await courseApi.checkRegistrationCodeUnique(code);
  };

  // validate methods
  const validateName = (value) => {
    if (value == null) return "Name is required";
    if (value.length < 4)
      return "Name's length must be greater than 4";
    if (value.length > 50)
      return "Name's length must be lower than 50";
  }

  const validateRegistrationCode = async (value) => {
    if (value == null) return "Registration Code is required";
    if (value.length !== 7)
      return "Registration Code must have a length of 7";
    
    if (
      (!selectedCourse || value !== selectedCourse.registrationCode) &&
      !(await checkRegistrationCodeUnique(value) === true)
    )
      return "Registration Code is already existed, please choose another one";
  }

  const validateRequiredSchoolYear = (value) => {
    if (value == null) return "Required school year is required";
    if (value < 1)
      return "Required school year must be greater than 1";
    if (value > 4)
      return "Required school year must be smaller than 4";
  }

  const validateNumberOfCredits = (value) => {
    if (value == null) return "Required school year is required";
    if (value < 0)
      return "Required school year must be greater than 0";
    if (value > 10)
      return "Required school year must be smaller than 10";
  }
  
  const validateDepartment = (value) => {
    if (value == null) return "Department is required";
    return;
  }

  const onFormikSubmit = async (data) => {
    const courseDTO = { ...data };
    return await onSubmit(courseDTO);
  }
  return (
    <Formik
      enableReinitialize
      initialValues={
        selectedCourse ?? {
          requiredSchoolYear: 1,
          numberOrCredits: 1,
        }
      }
      onSubmit={(values) => onFormikSubmit(values)}
    >
      {({ isValid, dirty }) => {
        return (
          <Form layout="vertical">
            <Form.Item
              name="name"
              required
              label="Name"
              style={{ width: "100%" }}
              validate={(value) => validateName(value)}
            >
              <Input
                name="name"
                placeholder="Name"
              />
            </Form.Item>

            <Form.Item
              name="registrationCode"
              label="Registration Code"
              required
              style={{ width: "100%" }}
              validate={value => validateRegistrationCode(value)}
            >
              <Input name="registrationCode" placeholder="Registration Code" />
            </Form.Item>

            <Form.Item
              required
              name="requiredSchoolYear"
              label="Required School Year"
              style={{ width: "100%" }}
              validate={value => validateRequiredSchoolYear(value)}
            >
              <InputNumber
                name="requiredSchoolYear"
                placeholder="Enter the minimum required school year to join this course"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              required
              name="numberOfCredits"
              label="Number Of Credits"
              style={{ width: "100%" }}
              validate={value => validateNumberOfCredits(value)}
            >
              <InputNumber
                name="numberOfCredits"
                placeholder="Enter the number of credits of this course"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              required
              name="departmentID"
              label="Department"
              style={{ width: "100%" }}
              validate={value => validateDepartment(value)}
            >
              <Select
                loading={departments === null}
                name="departmentID"
                placeholder="Select a Department"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {departments &&
                  departments.map((department) => (
                    <Select.Option key={department.code} value={department.id}>
                      {department.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <SubmitButton disabled={!(isValid && dirty)} style={{ width: "100%", marginBottom: "10px" }}>
              {selectedCourse ? "Update" : "Create"}
            </SubmitButton>
            <ResetButton style={{ width: "100%" }}>Reset</ResetButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CourseForm;
