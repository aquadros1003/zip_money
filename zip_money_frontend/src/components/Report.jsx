import React from "react";
import { Col } from "antd";
import { Row } from "antd";
import backendUrl from "../configs/BackendUrl";
import { Button } from "antd";

export const Report = (report) => {
  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col xl={18} lg={18} md={18} sm={18} xs={18}>
            <h3>
              Report from:{" "}
              {report.report.createdAt.toLocaleString().split("T")[0]}
            </h3>
            <h3>
              Time:{" "}
              {
                report.report.createdAt
                  .toLocaleString()
                  .split("T")[1]
                  .split(".")[0]
              }
            </h3>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <a
              href={`${backendUrl}${report.report.reportUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download={`${
                report.report.createdAt.toLocaleString().split("T")[0]
              }`}
            >
              <Button type="primary" className="mr-2">
                Download
              </Button>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Report;
