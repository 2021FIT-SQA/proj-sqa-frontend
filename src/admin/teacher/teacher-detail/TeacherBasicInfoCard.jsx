import React from "react";
import { Card, Row, Col } from "antd";
import convertDateTimeArrToString from "utils/dateConverter";

const TeacherBasicInfoCard = ({ teacher, cardTitle }) => {
  const buildInfoRow = (title, value) => (
    <Row style={{ marginBottom: "5px" }}>
      <Col span={8} style={{ paddingRight: 10 }}>
        {title}
      </Col>
      <Col span={16}>{value}</Col>
    </Row>
  );

  return (
    <Card
      title={
        cardTitle ??
        `Teacher Details for ${teacher.lastName} ${teacher.firstName}`
      }
      style={{ marginBottom: 20 }}
    >
      <>
        {buildInfoRow("ID", teacher.id)}
        {buildInfoRow("Username", teacher.username)}
        {buildInfoRow("First Name", teacher.firstName)}
        {buildInfoRow("Last Name", teacher.lastName)}
        {buildInfoRow("Gender", teacher.gender)}
        {buildInfoRow("Email", teacher.email)}
        {buildInfoRow("Phone Number", teacher.phoneNumber)}
        {buildInfoRow(
          "Date Of Birth",
          convertDateTimeArrToString(teacher.dob, "DATE")
        )}
        {buildInfoRow("Performance Rating", teacher.performanceRating)}
        {buildInfoRow(
          "Created At",
          convertDateTimeArrToString(teacher.createdAt, "DATE_TIME")
        )}
        {buildInfoRow(
          "Updated At",
          convertDateTimeArrToString(teacher.updatedAt, "DATE_TIME")
        )}
        {buildInfoRow("Department", teacher.department.name)}
        {buildInfoRow(
          "Created At",
          convertDateTimeArrToString(teacher.createdAt, "DATE_TIME")
        )}
      </>
    </Card>
  );
};

export default TeacherBasicInfoCard;
