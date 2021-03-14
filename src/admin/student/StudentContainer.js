import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Card, Row, Col, Button, Modal } from "antd";

import { FilterComponent, StudentTableComponent } from "./components";

import studentApi from "api/studentApi"; 
import CreateStudentForm from "./components/student-form/StudentForm";

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { postStudent } from 'redux/actions/student.action'

const StudentContainer = ({ postStudent }) => {

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
        throw error;
    }
    setStudentTableLoading(false);
  }

  useEffect(() => {
    fetchStudentList(pagination.current, pagination.pageSize, keyword);
  }, []);

  const handleFinish = (values) => {
    const { keyword } = values;
    setKeyword(previous => keyword)
    fetchStudentList(1, 10, keyword)
  };

  const handleReset =  () => {
    setKeyword(null)
    fetchStudentList(1, 10, "")
  }

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
          students={students}
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
            try {
              console.log("Sending... with Request DTO: ");
              console.log(createStudentDTO);

              const student = await postStudent(createStudentDTO);

              console.log("Success. Response Model: ");
              console.log(student);
              
              // Close the form dialog
              setStudentFormDialogOpened(false);

              // Show success dialog
              Modal.success({
                title: "Success",
                content: `Successfully saved student ${student.lastName} ${student.firstName} with ID ${student.id}`,
              });
            } catch (e) {
              Modal.error({
                title: "Error",
                content: e.toString(),
              });
            }
            return;
          }}
          initialValues={selectedStudent}
        />
      </Modal>
    </div>
  );
};

StudentContainer.propTypes = {
  postStudent: PropTypes.func.isRequired,
}

export default connect(null, { postStudent })(StudentContainer)
