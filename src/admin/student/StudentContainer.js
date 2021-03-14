import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import { Card, Row, Col, Button } from "antd";

import { FilterComponent, StudentTableComponent } from "./components";

import studentApi from "api/studentApi";
import CreateStudentForm from "./components/student-form/StudentForm";
import Modal from "antd/lib/modal/Modal";

const StudentContainer = () => {
  // STATE HANDLING
  const [students, setStudents] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [keyword, setKeyword] = useState(null);

  const [isStudentTableLoading, setStudentTableLoading] = useState(false);

  const [
    isCreateStudentFormDialogOpened,
    setStudentFormDialogOpened,
  ] = useState(false);

  // When a student is selected to edit in the student table, this field will be set and
  // then passed to the student form dialog as the initial values. This also means that
  // the student form will be switched from creating to editing mode.
  const [selectedStudent, setSelectedStudent] = useState(null);

  async function fetchStudentList(antCurrentPage, pageSize, keyword) {
    setStudentTableLoading(true);
    try {
      //calling getStudents() function from student action
      // => got undefine dispite of being connected mapDispatchToProps
      // => will refactor code using redux later
      const paramsString = queryString.stringify({
        page: antCurrentPage,
        size: pageSize,
        keyword: keyword,
      });
      const data = await studentApi.getPaginatedStudents(paramsString);
      const { content, pageable, totalElements } = data;

      setStudents(content);
      
      setPagination({
        // current: antCurrentPage,
        pageSize: pageable.pageSize,
        total: totalElements,
      });
    } catch (error) {
      console.log(error);
    }
    setStudentTableLoading(false);
  }

  useEffect(() => {
    fetchStudentList(pagination.current, pagination.pageSize, keyword);
  }, []);

  // @BUG: with each given keyword => only get the first page with 10 items
  const handleFinish = (values) => {
    // hanlde out search here
    const { keyword } = values;
    setKeyword((previous) => keyword);
    // @BUG: cannot set pagination to initial state ????
    // setPagination({
    //   ...pagination,
    //   current: 1,
    //   pageSize: 10
    // })

    // Garbage code -> not utility :<
    fetchStudentList(1, 10, keyword);
  };

  const handleReset = () => {
    // clear the filter
    // @BUG: keyword is set to be null is only available for FilterComponent
    //       local state is kept
    setKeyword(null);
    // @BUG: cannot set pagination to initial state ????
    // setPagination({
    //   ...pagination,
    //   current: 1,
    //   pageSize: 10
    // })
    fetchStudentList(1, 10, "");
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    fetchStudentList(current, pageSize, keyword);
  };
  return (
    <div>
      <Card title="Students" style={{ overflowX: "auto" }}>
        <Row>
          <Col span={22}>
            <FilterComponent
              keyword={keyword}
              onFinish={handleFinish}
              onReset={handleReset}
            />
          </Col>
          <Col span={2}>
            <Button
              onClick={() => {
                setSelectedStudent(null);
                setStudentFormDialogOpened(true);
              }}
            >
              Add Student
            </Button>
          </Col>
        </Row>

        <StudentTableComponent
          loading={isStudentTableLoading}
          data={students.map((student, index) => {
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
            };
          })}
          onChange={handleTableChange}
          pagination={pagination}
          onStudentEdit={(_, index) => { 
            setSelectedStudent(students[index]); 
            setStudentFormDialogOpened(true);
          }}
        />
      </Card>

      <Modal
        title={selectedStudent ? `Edit Student ${selectedStudent.lastName} ${selectedStudent.firstName}` : "Create a new Student"}
        visible={isCreateStudentFormDialogOpened}
        onOk={() => {
          setStudentFormDialogOpened(false);
        }}
        onCancel={() => {
          setStudentFormDialogOpened(false);
        }}
        footer={null}
      >
        <CreateStudentForm
          mode={selectedStudent ? "edit" : "create"}
          onSubmit={async (createStudentDTO) => {
            // TODO: Call backend
            console.log(createStudentDTO);
            return new Promise(r => setTimeout(r, 2000));
          }}
          initialValues={selectedStudent}
        />
      </Modal>
    </div>
  );
};

export default StudentContainer;
