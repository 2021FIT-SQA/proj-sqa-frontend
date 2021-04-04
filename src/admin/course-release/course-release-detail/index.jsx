import React from "react";
import { useLocation } from "react-router-dom";
import courseReleaseApi from "api/courseReleaseApi";
import { Row, Col, Card } from "antd";
import CourseReleaseBasicInfoCard from "./CourseReleaseBasicInfoCard";
import EnrollmentContainer from "../../enrollment/index/index";
import CourseBasicInfoCard from "admin/course/course-detail/CourseBasicInfoCard";
import TeacherBasicInfoCard from "admin/teacher/teacher-detail/TeacherBasicInfoCard";

const CourseReleaseDetailContainer = () => {

  const location = useLocation();

  const courseReleaseID = parseInt(location.pathname.split("/").pop());

  const [courseRelease, setCourseRelease] = React.useState(null);

  const fetchCourse = async (courseReleaseID) => {
    const result = await courseReleaseApi.getById(courseReleaseID);
    console.log(result);
    setCourseRelease(result);
  };

  React.useEffect(() => {
    fetchCourse(courseReleaseID);
  }, [courseReleaseID]);

  return courseRelease && (
    <div style={{ overflow: "auto", height: "100%"}}>
      
      <CourseReleaseBasicInfoCard courseRelease={courseRelease} />

      <Row style={{width: "100%", marginBottom: "20px"}}>
        <Col span={8}>
          <CourseBasicInfoCard course={courseRelease.course} cardTitle={"About Course"}/>
        </Col>
        <Col span={8}>
          <TeacherBasicInfoCard teacher={courseRelease.teacher} cardTitle={"About Teacher"} />
        </Col>
        <Col span={8}>
          <Card title="About Timetable">Hello, timetable</Card>
        </Col>
      </Row>

      <EnrollmentContainer options={{ forCourseRelease: courseRelease.id }} />
    </div>
  );
};

export default CourseReleaseDetailContainer;
