import React from "react";
import { Card, Row, Col } from "antd";
import convertDateTimeArrToString from "utils/dateConverter";

const CourseBasicInfoCard = ({ course, cardTitle }) => {
  const buildInfoRow = (title, value) => (
    <Row style={{ marginBottom: "5px" }}>
      <Col span={8} style={{paddingRight: 10}}>{title}</Col>
      <Col span={16}>{value}</Col>
    </Row>
  );

  return (
    <Card
      title={cardTitle ?? `Course Details for ${course.name}`}
      style={{ marginBottom: 20 }}
    >
      <>
        {buildInfoRow("ID", course.id)}
        {buildInfoRow("Registration Code", course.registrationCode)}
        {buildInfoRow("Department", course.department.code)}
        {buildInfoRow("Number of Credits", course.numberOfCredits)}
        {buildInfoRow("Required School Year", course.requiredSchoolYear)}
        {buildInfoRow("Active Release Count", course.activeReleasesCount)}
        {buildInfoRow("Department", course.department.name)}
        {buildInfoRow(
          "Created At",
          convertDateTimeArrToString(course.createdAt, "DATE_TIME")
        )}
      </>
    </Card>
  );
};

export default CourseBasicInfoCard;
