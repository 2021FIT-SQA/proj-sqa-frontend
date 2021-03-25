import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Card, Button, Modal, Typography, Row, Col } from "antd";

import { FilterComponent, StudentTableComponent } from "./components";

import studentApi from "api/studentApi";
import CreateStudentForm from "./components/student-form/StudentForm";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postStudent, updateStudent, deleteStudent } from "redux/actions/student.action";

const StudentContainer = ({ postStudent, updateStudent, deleteStudent }) => {

  // COMPONENT STATE
  const [students, setStudents] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    keyword: undefined,
    sort: [],
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [isStudentTableLoading, setStudentTableLoading] = useState(false);
  const [
    isCreateStudentFormDialogOpened,
    setStudentFormDialogOpened,
  ] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  async function fetchStudentList(paramsString) {
    setStudentTableLoading(true);
    try {
      const data = await studentApi.getPaginatedStudents(paramsString);
      const { content, pageable, totalElements } = data;

      setStudents(content);

      setPagination((pre) => {
        return {
          ...pre,
          current: pageable.pageNumber + 1,
          pageSize: pageable.pageSize,
          total: totalElements,
        };
      });
    } catch (error) {
      throw error;
    }
    setStudentTableLoading(false);
  }

  // COMPONENT DID MOUNT 
  useEffect(() => {
    fetchStudentList(queryString.stringify(params));
  }, [params]);

  // HANDLE TABLE ACTIONS & PAGINATION CHANGING
  const handleFinish = (values) => {
    setParams((previous) => {
      return {
        ...previous,
        keyword: values.keyword,
        sort: values.sort,
      };
    });
  };
  const handleReset = () => {
    setParams((previous) => {
      return {
        ...previous,
        keyword: undefined,
        sort: [],
      };
    });
  };
  const handleTableChange = (pagination, filters) => {
    fetchStudentList(
      queryString.stringify({
        page: pagination.current,
        size: pagination.pageSize,
        keyword: params.keyword,
        sort: params.sort,
      })
    );
  };

  const onStudentFormSubmit = async (createStudentDTO) => {
    setStudentTableLoading(true);
    try {
      // Add new student
      if (selectedStudent === null) {
        const student = await postStudent(createStudentDTO);
        setStudentFormDialogOpened(false);
        Modal.success({
          title: "Success",
          content: `Successfully created student ${student.lastName} ${student.firstName} with ID ${student.id}`,
        });
        setStudents([...students, student])
      } 
      else { 
        // update student by id
        const student = await updateStudent(createStudentDTO, createStudentDTO.id);
        setStudentFormDialogOpened(false);
        Modal.success({
          title: "Success",
          content: `Successfully updated student ${student.lastName} ${student.firstName} with ID ${student.id}`,
        });
        
        // Update students arr with the edited student
        setStudents(students.map(std => std.id === student.id ? student : std));
      } 
    } catch (e) {
        Modal.error({
          title: "Error",
          content: 'Some unexpected errors come. Try later!',
        });
    }
    setStudentTableLoading(false);
    return;
  }

  const onStudentDelete = (studentID) => {
    Modal.warning({
      title: "Confirm Deletion",
      content: `Are you sure want to delete student ${studentID}`,
      closable: true,
      maskClosable: true,
      onOk: async () => {
        setStudentTableLoading(true);
        try {
          const result = await deleteStudent(studentID);
          if (result) {
            Modal.success({
              title: "Delete successfully",
              content: `Successfully deleted student with ID: ${studentID}`,
            });
  
            // Update students arr with deleted student
            setStudents(students.filter(std => std.id !== studentID));
          }
        } catch (e) {
          Modal.error({
            title: "Delete failed",
            content: e.toString(),
          })
        }
        setStudentTableLoading(false);
      },
    })
  };

  return (
    <div>
      <Card title="Students" style={{ overflowX: "auto" }}>
        <FilterComponent
          keyword={params.keyword}
          onFinish={handleFinish}
          onReset={handleReset}
        />
        <Row>
          <Col span={24} style={{ marginBottom: "15px" }}>
            {pagination.total && (
              <Typography.Text>
                Found <b>{pagination.total}</b> records
              </Typography.Text>
            )}
          </Col>

          <Col span={24}>
            <Button
              type="primary"
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
          onStudentDelete={(_, index) => {
            onStudentDelete(students[index].id);
          }}
        />
      </Card>

      <Modal
        title={
          selectedStudent
            ? `Edit Student ${selectedStudent.lastName} ${selectedStudent.firstName}`
            : "Create a new Student"
        }
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
          onSubmit={onStudentFormSubmit}
          selectedStudent={selectedStudent}
        />
      </Modal>
    </div>
  );
};

StudentContainer.propTypes = {
  postStudent: PropTypes.func.isRequired,
  updateStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default connect(null, { postStudent, updateStudent, deleteStudent })(StudentContainer);
