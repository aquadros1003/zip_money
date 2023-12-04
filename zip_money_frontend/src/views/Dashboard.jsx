import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Row, Col, Card, Avatar, Dropdown, Table, Menu } from "antd";
import StatisticWidget from "../components/StatisticWidget";
import ChartWidget from "../components/ChartWidget";
import GoalWidget from "../components/GoalWidget";
import {
  apexLineChartDefaultOption,
  COLOR_2,
} from "../constants/ChartConstant";
import {
  FileExcelOutlined,
  PrinterOutlined,
  EllipsisOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import GET_TRANSACTIONS from "../api/queries/GetTransactions";
import GET_EXPENSES from "../api/queries/GetMonthlyExpenses";
import GET_MONTHLY_CHART_DATA from "../api/queries/GetMonthlyChartData";
import GET_PINNED_BUDGET from "../api/queries/GetPinnedBudget";
import { Spin } from "antd";
import NotPinnedBudget from "../components/NotPinnedBudget";

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
);

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const tableColumns = [
  {
    title: "Category",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <Avatar
          size={30}
          className="font-size-sm"
          style={{ backgroundColor: record.avatarColor }}
        >
          {record.name[0].toUpperCase()}
        </Avatar>
        <span className="ml-2">{text}</span>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const Dashboard = () => {
  const [visitorChartData, setVisitorChartData] = useState();

  const { loading, data } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: "cache-and-network",
  });
  const { data: data2 } = useQuery(GET_EXPENSES, {
    fetchPolicy: "cache-and-network",
  });
  const { data: chartData, loading: chartLoading } = useQuery(
    GET_MONTHLY_CHART_DATA,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const { data: pinnedBudgetData, loading: pinnedBudgetLoading } = useQuery(
    GET_PINNED_BUDGET,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const tableData = data?.me?.transactions?.edges.map((item) => ({
    amount: `${item.node.currency.symbol}` + " " + `${item.node.amount}`,
    currency: `${item.node.currency.symbol}`,
    name: `${item.node.category.name}`,
    date: `${item.node.date}`,
    avatarColor: COLOR_2,
  }));

  useEffect(() => {
    if (chartData) {
      const chartDataArray = chartData?.me?.monthlyTransactions?.edges.map(
        (item) => item.node
      );
      const categories = chartDataArray.map((item) => item.dayDate);
      const series = chartDataArray.map((item) => item.amount);
      setVisitorChartData({
        series: [
          {
            name: "Amount",
            data: series.reverse(),
          },
        ],
        categories: categories.reverse(),
      });
    }
  }, [chartData]);

  const hasPinnedBudget = pinnedBudgetData?.me?.pinnedBudget !== null;

  return (
    <>
      <Col span={24}>
        {loading && (
          <div className="text-center mt-5">
            <Spin />
          </div>
        )}
        <div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={10}>
              <StatisticWidget
                title={"Monthly Expenses"}
                value={"$" + " " + data2?.me?.monthlyExpenses?.toFixed(2)}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={10}>
              <StatisticWidget
                title={"Daily Expenses"}
                value={"$" + " " + data2?.me?.dailyExpenses?.toFixed(2)}
              />
            </Col>
            <Col xs={20} sm={20} md={20} lg={20} xl={4}>
              {hasPinnedBudget && (
                <GoalWidget
                  value={
                    pinnedBudgetData?.me?.pinnedBudget?.budget
                      ?.spentRemainingPercentage
                  }
                  subtitle={
                    pinnedBudgetData?.me?.pinnedBudget?.budget?.remainingBudget?.toFixed(
                      2
                    ) +
                    "/" +
                    pinnedBudgetData?.me?.pinnedBudget?.budget?.budget
                  }
                />
              )}

              {!hasPinnedBudget && <NotPinnedBudget></NotPinnedBudget>}
            </Col>
          </Row>
          <Col span={24}>
            {chartLoading && (
              <div className="text-center mt-5">
                <Spin />
              </div>
            )}
            <ChartWidget
              series={visitorChartData?.series}
              xAxis={visitorChartData?.categories}
              type="area"
              height={300}
              width="100%"
              customOptions={apexLineChartDefaultOption}
            />
          </Col>
          <Col span={24} className="mt-4">
            <Card
              title="Latest Transactions"
              extra={cardDropdown(latestTransactionOption)}
            >
              <Table
                className="no-border-last"
                columns={tableColumns}
                dataSource={tableData}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </Col>
        </div>
      </Col>
    </>
  );
};

export default Dashboard;
