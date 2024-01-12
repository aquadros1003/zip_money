import React from "react";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import GET_REPORTS from "../api/queries/GetReports";
import Report from "../components/Report";

const Reports = () => {
  const { loading, error, data } = useQuery(GET_REPORTS);
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;

  return (
    (data.me.reports.edges.length > 0 && (
      <div className="container">
        <div className="column">
          {data.me.reports.edges.map((report) => (
            <div className="p-3">
              <Report report={report.node} id={report.node.id} />
            </div>
          ))}
        </div>
      </div>
    )) || (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <h1>No reports</h1>
          </div>
        </div>
      </div>
    )
  );
};

export default Reports;
