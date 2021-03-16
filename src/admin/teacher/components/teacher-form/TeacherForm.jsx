import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  SubmitButton,
  ResetButton,
  Radio,
  Select,
} from "formik-antd";
import { Formik } from "formik";
import moment from "moment";
import departmentApi from "api/departmentApi";
import userApi from "api/userApi";


const TeacherForm = ({ onSubmit, selectedTeacher }) => {
  const now = moment();
  const [departments, setDepartments] = useState(null);

  selectedTeacher &&
    (function convertInitialValuesToDTO() {
      selectedTeacher.departmentID = selectedTeacher.department.id;
    })();

  useEffect(() => {
    departmentApi.getAllDepartments().then((result) => {
      setDepartments(result);
    });
  }, []);

  const leftFillNum = (num, targetLength) => {
    return num.toString().padStart(targetLength, 0);
  }

  const convertMomentToDateString = (value) => {
    if (value.format) return value.format("YYYY-MM-DD");
    // Array type
    else
      return `${value[0]}-${leftFillNum(value[1], 2)}-${leftFillNum(
        value[2],
        2
      )}`;
  };

  const checkEmailUnique = async (email) => {
    return await userApi.checkEmailUnique(email);
  };

  const checkPhoneNumberUnique = async (phoneNumber) => {
    return await userApi.checkPhoneNumberUnique(phoneNumber);
  };

  // validate methods
  const validatePerformanceRating = (value) => {
    console.log(value);
  }

  const validateFirstName = (value) => {
    if (value == null) return "First Name is required";
    if (value.length < 1)
      return "First Name's length must be greater than 1";
    if (value.length > 50)
      return "First Name's length must be lower than 50";
  }

  const validateLastName = (value) => {
    if (value == null) return "Last Name is required";
    if (value.length < 1)
      return "Last Name's length must be greater than 1";
    if (value.length > 50)
      return "Last Name's length must be lower than 50";
  }

  const validateEmail = async (value) => {
    if (value == null) return "Email is required";
    if (value.length < 4)
      return "Email's length must be greater than 4";
    if (value.length > 50)
      return "Email's length must be lower than 50";
    if (
      (!selectedTeacher || value !== selectedTeacher.email) &&
      !(await checkEmailUnique(value) === true)
    )
      return "Email is already existed, please choose another one";
  }

  const validatePhone = async (value) => {
    if (value == null) return "Phone Number is required";
    if (value.length < 9) return "Phone Number's length must be greater than 9";
    if (value.length > 10) return "Phone Number's length must be lower than 10";
    if (
      (!selectedTeacher || value !== selectedTeacher.phoneNumber) &&
      !(await checkPhoneNumberUnique(value) === true)
    )
      return "Phone Number is already existed, please choose another one";
  }

  const validateGender = (value) => {
    if (value == null) return "Gender is required";
  }

  const validateDOB = (value) => {
    // value is String type in UTC format
    if (value == null) return "Date Of Birth is required";
    const transformed = moment(value);
    if (!transformed.isSameOrBefore(now))
      // Moment.isSameOrBefore()
      return "Date or Birth must be in the past or at the present";
  }

  const validateDepartment = (value) => {
    if (value == null) return "Department is required";
    return;
  }

  const onFormikSubmit = async (data) => {
    const studentDTO = { ...data };

    if (typeof studentDTO.dob === "string") {
      // 2000-01-03T17:00:00.000Z, for example
      studentDTO.dob = studentDTO.dob.substring(10);
    }
    // Get the 2000-01-03 part
    else if (typeof data.dob === "object") {
      studentDTO.dob = convertMomentToDateString(studentDTO.dob);
    }
    await onSubmit(studentDTO);
  }
  return (
    <Formik
      enableReinitialize
      initialValues={
        selectedTeacher ?? {
          gender: "Male",
          dob: moment("01/01/2000", "DD/MM/YYYY"),
          sinceYear: 2016,
        }
      }
      onSubmit={(values) => onFormikSubmit(values)}
    >
      {({ values, handleSubmit, isSubmitting, errors, touched }) => {
        return (
          <Form layout="vertical">
            <Form.Item
              required
              name="firstName"
              label="First Name"
              style={{ width: "100%" }}
              validate={(value) => validateFirstName(value)}
            >
              <Input name="firstName" placeholder="First Name" />
            </Form.Item>

            <Form.Item
              required
              name="lastName"
              label="Last Name"
              style={{ width: "100%" }}
              validate={value => validateLastName(value)}
            >
              <Input name="lastName" placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              type="email"
              name="email"
              label="Email"
              required
              style={{ width: "100%" }}
              validate={value => validateEmail(value)}
            >
              <Input name="email" type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              required
              name="phoneNumber"
              label="Phone Number"
              style={{ width: "100%" }}
              validate={value => validatePhone(value)}
            >
              <Input name="phoneNumber" placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              required
              name="gender"
              label="Gender"
              style={{ width: "100%" }}
              validate={value => validateGender(value)}
            >
              <Radio.Group
                name="gender"
                defaultValue="Male"
                buttonStyle="solid"
                style={{ width: "100%" }}
              >
                <Radio.Button value="Male" style={{ width: "50%" }}>
                  Male
                </Radio.Button>
                <Radio.Button value="Female" style={{ width: "50%" }}>
                  Female
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              required
              name="dob"
              label="Date Of Birth"
              style={{ width: "100%" }}
              validate={value => validateDOB(value)}
            >
              <DatePicker
                name="dob"
                placeholder="Enter Date Of Birth"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item
              required
              name="performanceRating"
              label="Performance Rating"
              style={{ width: "100%" }}
              validate={value => validatePerformanceRating(value)}
            >
              <InputNumber
                name="performanceRating"
                placeholder="Enter the performance rating"
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

            <SubmitButton style={{ width: "100%", marginBottom: "10px" }}>
              {selectedTeacher ? "Update" : "Create"}
            </SubmitButton>
            <ResetButton style={{ width: "100%" }}>Reset</ResetButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TeacherForm;
