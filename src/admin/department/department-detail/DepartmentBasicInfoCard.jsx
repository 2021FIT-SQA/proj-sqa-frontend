import React from "react";
import { Card, Row, Col } from "antd";
import convertDateTimeArrToString from "utils/dateConverter";

const DepartmentBasicInfoCard = ({ department, cardTitle }) => {
  const buildInfoRow = (title, value) => (
    <Row style={{ marginBottom: "5px" }}>
      <Col span={8}>{title}</Col>
      <Col span={16}>{value}</Col>
    </Row>
  );
  return (
    <Card
        title={cardTitle ?? `Department Details for ${department.name}`}
        style={{ marginBottom: 20 }}
      >
        <>
        {buildInfoRow("ID", department.id)}
        {buildInfoRow("Name", department.name)}
        {buildInfoRow("Code", department.code)}
        {buildInfoRow("Created At", convertDateTimeArrToString(department.createdAt, "DATE_TIME"))}
        {buildInfoRow("Updated At", convertDateTimeArrToString(department.updatedAt, "DATE_TIME"))}
        </>
      </Card>
  );
};

export default DepartmentBasicInfoCard;
