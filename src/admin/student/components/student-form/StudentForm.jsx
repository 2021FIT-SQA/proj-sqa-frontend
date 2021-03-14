import React from "react";
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

const StudentForm = ({ onSubmit, initialValues, mode }) => {
  const now = moment();

  const [departments, setDepartments] = React.useState(null);

  initialValues &&
    (function convertInitialValuesToDTO() {
      // Transform
      initialValues.departmentID = initialValues.department.id;
    })();

  React.useEffect(() => {
    departmentApi.getAllDepartments().then((result) => {
      setDepartments(result);
    });
  }, []);

  const convertMomentToDateString = (value) => {
    return value.format("YYYY-MM-DD");
  };

  const checkUsernameUnique = async (username) => {
    return await userApi.checkUsernameUnique(username);
  };

  const checkEmailUnique = async (email) => {
    return await userApi.checkEmailUnique(email);
  };

  const checkPhoneNumberUnique = async (phoneNumber) => {
    return await userApi.checkPhoneNumberUnique(phoneNumber);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={
        initialValues ?? {
          gender: "Male",
          dob: moment("01/01/2000", "DD/MM/YYYY"),
          sinceYear: 1975,
        }
      }
      onSubmit={async (data) => {
        // @BUG: Cannot determine the correct type of data.dob at runtime
        // it is either "string" or "Moment" (as "object" when checking with typeof)

        // The current solution is to check its type first, then convert it to DTO

        const studentDTO = { ...data };

        if (typeof studentDTO.dob === "string") // 2000-01-03T17:00:00.000Z, for example
          studentDTO.dob = studentDTO.dob.substring(10); // Get the 2000-01-03 part
        else if (typeof data.dob === "object")
          studentDTO.dob = convertMomentToDateString(studentDTO.dob);

        console.log(data);

        await onSubmit(studentDTO);
      }}
    >
      {({ values, handleSubmit, isSubmitting }) => {
        return (
          <Form layout="vertical">
            {/* every formik-antd component must have the 'name' prop set: */}
            <Form.Item
              name="username"
              required
              label="Username"
              style={{ width: "100%" }}
              validate={async (value) => {
                if (value == null) return "Username is required";
                if (value.length < 4)
                  return "Username's length must be greater than 4";
                if (value.length > 25)
                  return "Username's length must be lower than 25";
                if (!((await checkUsernameUnique(value)) === true))
                  return "Username is already existed, please choose another one";
              }}
            >
              <Input name="username" placeholder="Username" />
            </Form.Item>

            <Form.Item
              hidden={mode === "edit"}
              required
              name="password"
              label="Password"
              style={{ width: "100%" }}
              validate={async (value) => {
                if (value == null) return "Password is required";
                if (value.length < 8)
                  return "Password's length must be greater than 8";
                if (value.length > 100)
                  return "Password's length must be lower than 100";
              }}
            >
              <Input name="password" placeholder="Password" />
            </Form.Item>

            <Form.Item
              required
              name="firstName"
              label="First Name"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "First Name is required";
                if (value.length < 1)
                  return "First Name's length must be greater than 1";
                if (value.length > 50)
                  return "First Name's length must be lower than 50";
              }}
            >
              <Input name="firstName" placeholder="First Name" />
            </Form.Item>

            <Form.Item
              required
              name="lastName"
              label="Last Name"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Last Name is required";
                if (value.length < 1)
                  return "Last Name's length must be greater than 1";
                if (value.length > 50)
                  return "Last Name's length must be lower than 50";
              }}
            >
              <Input name="lastName" placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              type="email"
              name="email"
              label="Email"
              required
              style={{ width: "100%" }}
              validate={async (value) => {
                if (value == null) return "Email is required";
                if (value.length < 4)
                  return "Email's length must be greater than 4";
                if (value.length > 50)
                  return "Email's length must be lower than 50";
                if (!((await checkEmailUnique(value)) === true))
                  return "Email is already existed, please choose another one";
              }}
            >
              <Input name="email" type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              required
              name="phoneNumber"
              label="Phone Number"
              style={{ width: "100%" }}
              validate={async (value) => {
                if (value == null) return "Phone Number is required";
                if (value.length < 9)
                  return "Phone Number's length must be greater than 9";
                if (value.length > 10)
                  return "Phone Number's length must be lower than 10";
                if (!((await checkPhoneNumberUnique(value)) === true))
                  return "Phone Number is already existed, please choose another one";
              }}
            >
              <Input name="phoneNumber" placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              required
              name="gender"
              label="Gender"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Gender is required";
              }}
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
              validate={(value) => {
                // value is String type in UTC format
                if (value == null) return "Date Of Birth is required";

                const transformed = moment(value);

                if (!transformed.isSameOrBefore(now))
                  // Moment.isSameOrBefore()
                  return "Date or Birth must be in the past or at the present";
              }}
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
              name="sinceYear"
              label="Joined year"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Joined year required";
                if (value < 1975)
                  return "Joined year must be greater than 1975";
              }}
            >
              <InputNumber
                name="sinceYear"
                placeholder="Enter the year when the student joined this school"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              required
              name="fatherName"
              label="Father Name"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Father Name is required";
                if (value.length < 2)
                  return "Father Name's length must be greater than 2";
                if (value.length > 50)
                  return "Father Name's length must be lower than 50";
              }}
            >
              <Input name="fatherName" placeholder="Father Name" />
            </Form.Item>

            <Form.Item
              required
              name="motherName"
              label="Mother Name"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Mother Name is required";
                if (value.length < 2)
                  return "Mother Name's length must be greater than 2";
                if (value.length > 50)
                  return "Mother Name's length must be lower than 50";
              }}
            >
              <Input name="motherName" placeholder="Mother Name" />
            </Form.Item>

            <Form.Item
              required
              name="fullAddress"
              label="Full Address"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Full Address is required";
                if (value.length < 2)
                  return "Full Address's length must be greater than 2";
                if (value.length > 255)
                  return "Full Address's length must be lower than 255";
              }}
            >
              <Input name="fullAddress" placeholder="Full Address" />
            </Form.Item>

            <Form.Item
              required
              name="departmentID"
              label="Department"
              style={{ width: "100%" }}
              validate={(value) => {
                if (value == null) return "Department is required";
                return;
              }}
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
              {mode === "edit" ? "Update" : "Create"}
            </SubmitButton>
            <ResetButton style={{ width: "100%" }}>Reset</ResetButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentForm;
