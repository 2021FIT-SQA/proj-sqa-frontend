import React from "react";
import { Card, Row, Col } from "antd";
import convertDateTimeArrToString from "utils/dateConverter";

const CourseReleaseBasicInfoCard = ({ courseRelease, cardTitle }) => {
  const buildInfoRow = (title, value) => (
    <Row style={{ marginBottom: "5px" }}>
      <Col span={8}>{title}</Col>
      <Col span={16}>{value}</Col>
    </Row>
  );

  return (
    <Card
        title={cardTitle ?? `Course Release Details for ${courseRelease.season} - ${courseRelease.releaseYear} ${courseRelease.course.name}`}
        style={{ marginBottom: 20 }}
      >
        <>
        {buildInfoRow("ID", courseRelease.id)}
        {buildInfoRow("Release In", `${courseRelease.season} - ${courseRelease.releaseYear}`)}
        {buildInfoRow("Active", courseRelease.isActive ? "YES" : "NO")}
        {buildInfoRow("Start Date", convertDateTimeArrToString(courseRelease.startDate, "DATE"))}
        {buildInfoRow("Start Date", convertDateTimeArrToString(courseRelease.endDate, "DATE"))}
        {buildInfoRow("Course Name", courseRelease.course.name)}
        {buildInfoRow("Teacher Name", `${courseRelease.teacher.lastName} ${courseRelease.teacher.firstName}`)}
        {buildInfoRow("Created At", convertDateTimeArrToString(courseRelease.createdAt, "DATE_TIME"))}
        {buildInfoRow("Updated At", convertDateTimeArrToString(courseRelease.updatedAt, "DATE_TIME"))}
        </>
      </Card>
  );
};

export default CourseReleaseBasicInfoCard;
