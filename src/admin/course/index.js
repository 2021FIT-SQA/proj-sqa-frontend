import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Card, Button, Modal, Typography, Row, Col } from "antd";

import { FilterComponent, CourseTableComponent } from "./components";

import courseApi from "api/courseApi";
import CreateCourseForm from "./components/course-form/CourseForm";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postCourse, updateCourse, deleteCourse } from "redux/actions/course.action";

const CourseContainer = ({ postCourse, updateCourse, deleteCourse }) => {

  // COMPONENT STATE
  const [courses, setCourses] = useState([]);
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
  const [isCourseTableLoading, setCourseTableLoading] = useState(false);
  const [
    isCreateCourseFormDialogOpened,
    setCourseFormDialogOpened,
  ] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  async function fetchCourseList(paramsString) {
    setCourseTableLoading(true);
    try {
      const data = await courseApi.getPaginatedCourses(paramsString);
      const { content, pageable, totalElements } = data;

      setCourses(content);

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
    setCourseTableLoading(false);
  }

  // COMPONENT DID MOUNT 
  useEffect(() => {
    fetchCourseList(queryString.stringify(params));
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
        keyword: "",
        sort: [],
      };
    });
  };
  const handleTableChange = (pagination, filters) => {
    fetchCourseList(
      queryString.stringify({
        page: pagination.current,
        size: pagination.pageSize,
        keyword: params.keyword,
        sort: params.sort,
      })
    );
  };

  const onCourseFormSubmit = async (createCourseDTO) => {
    setCourseTableLoading(true);
    try {
      // Add new course
      if (selectedCourse === null) {
        const course = await postCourse(createCourseDTO);
        setCourseFormDialogOpened(false);
        Modal.success({
          title: "Success",
          content: `Successfully created course ${course.name} with ID ${course.id}`,
        });
        setCourses([...courses, course]);
      } 
      else { 
        // update course by id
        const course = await updateCourse(createCourseDTO, createCourseDTO.id);
        setCourseFormDialogOpened(false);
        Modal.success({
          title: "Success",
          content: `Successfully updated course ${course.name} with ID ${course.id}`,
        });
        // Update courses arr with the edited course
        setCourses(courses.map(c => c.id === course.id ? course : c));
      } 
    } catch (e) {
        Modal.error({
          title: "Error",
          content: 'Some unexpected errors come. Try later!',
        });
    }
    setCourseTableLoading(false);
    return;
  }

  const onCourseDelete = (courseID) => {
    Modal.warning({
      title: "Confirm Deletion",
      content: `Are you sure want to delete course ${courseID}`,
      closable: true,
      maskClosable: true,
      onOk: async () => {
        setCourseTableLoading(true);
        try {
          const result = await deleteCourse(courseID);
          if (result) {
            Modal.success({
              title: "Delete successfully",
              content: `Successfully deleted course with ID: ${courseID}`,
            });
  
            // Update courses arr with deleted course
            setCourses(courses.filter(c => c.id !== courseID));
          }
        } catch (e) {
          Modal.error({
            title: "Delete failed",
            content: e.toString(),
          })
        }
        setCourseTableLoading(false);
      },
    })
  };

  return (
    <div>
      <Card title="Courses" style={{ overflowX: "auto" }}>
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
                setSelectedCourse(null);
                setCourseFormDialogOpened(true);
              }}
            >
              Add Course
            </Button>
          </Col>
        </Row>

        <CourseTableComponent
          loading={isCourseTableLoading}
          courses={courses}
          onChange={handleTableChange}
          pagination={pagination}
          onCourseEdit={(_, index) => {
            setSelectedCourse(courses[index]);
            setCourseFormDialogOpened(true);
          }}
          onCourseDelete={(_, index) => {
            onCourseDelete(courses[index].id);
          }}
        />
      </Card>

      <Modal
        title={
          selectedCourse
            ? `Edit Course ${selectedCourse.name} with ID ${selectedCourse.id}`
            : "Create a new Course"
        }
        visible={isCreateCourseFormDialogOpened}
        onOk={() => {
          setCourseFormDialogOpened(false);
        }}
        onCancel={() => {
          setCourseFormDialogOpened(false);
        }}
        footer={null}
      >
        <CreateCourseForm
          mode={selectedCourse ? "edit" : "create"}
          onSubmit={onCourseFormSubmit}
          selectedCourse={selectedCourse}
        />
      </Modal>
    </div>
  );
};

CourseContainer.propTypes = {
  postCourse: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default connect(null, { postCourse, updateCourse, deleteCourse })(CourseContainer);
