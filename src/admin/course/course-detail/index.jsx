import { Card, Row, Col } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import courseApi from "api/courseApi";
import CourseBasicInfoCard from "./CourseBasicInfoCard";
import CourseReleaseContainer from "../../course-release/index"
import DepartmentBasicInfoCard from "admin/department/department-detail/DepartmentBasicInfoCard";

const CourseDetailsContainer = () => {
  const location = useLocation();

  const courseID = parseInt(location.pathname.split("/").pop());

  const [course, setCourse] = useState(null);

  const fetchCourse = async (courseID) => {
    const result = await courseApi.getByID(courseID);
    setCourse(result);
  };

  React.useEffect(() => {
    fetchCourse(courseID);
  }, [courseID]);

  return (
    course && (
      <div style={{ overflow: "auto", height: "100%"}}>

        <CourseBasicInfoCard course={course}/>
        <Row>
          <Col span={24}>
            <DepartmentBasicInfoCard department={course.department} cardTitle={"About Department"}/>
          </Col>
        </Row>
        <CourseReleaseContainer options={{ forCourse: course.id }}/>
      </div>
    )
  );
};

export default CourseDetailsContainer;
