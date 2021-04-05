import React, { useState } from "react";
import { Row, Col } from "antd";
import "./style.scss";
import PanelGroup from "../components/panel-group";
import LineChart from "../components/line-chart";
import BarChart from "../components/bar-chart";
import RaddarChart from "../components/raddar-chart";
import PieChart from "../components/pie-chart";
import TransactionTable from "../components/transaction-table";
import BoxCard from "../components/box-chart";

const lineChartDefaultData = {
  "New Visits": {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  Messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  Purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  Shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

const DashboardAdminContainer = () => {
  const [lineChartData, setLineChartData] = useState(
    lineChartDefaultData["New Visits"]
  );

  const handleSetLineChartData = (type) => setLineChartData(lineChartDefaultData[type]);
  return (
    <div className="app-container">
      <a
        href="https://github.com/2021FIT-SQA/proj-sqa-frontend/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        className="github-corner"
      >Github</a>

      <PanelGroup handleSetLineChartData={handleSetLineChartData} />

      <div className="chart-wrapper">
        <LineChart
          chartData={lineChartData}
          styles={{
            padding: 12,
            backgroundColor: "#fff",
            marginBottom: "25px",
          }}
        />
      </div>

      <Row gutter={32}>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <RaddarChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ paddingRight: "8px", marginBottom: "30px" }}
        >
          <TransactionTable />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ marginBottom: "30px", height: '100%' }}
        >
          <BoxCard />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardAdminContainer;
