import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Row,
  Col,
  Card,
  Avatar,
  Dropdown,
  Table,
  Menu,
  DatePicker,
  Select,
  Pagination,
  Button,
} from "antd";
import GET_TRANSACTIONS from "../api/queries/GetTransactions";
import { Spin } from "antd";
import AvatarImg from "../assets/default-avatar.jpg";
import {
  apexLineChartDefaultOption,
  COLOR_2,
} from "../constants/ChartConstant";
import backendUrl from "../configs/BackendUrl";
import { toast, Toaster } from "react-hot-toast";
import { ReloadOutlined } from "@ant-design/icons";
import GET_CATEGORIES from "../api/queries/GetCategories";
import GET_CURRENCIES from "../api/queries/GetCurrencies";
import GET_BUDGETS from "../api/queries/GetBudgets";
import CREATE_REPORT from "../api/mutations/CreateReport";
import { useMutation } from "@apollo/client";

const Transactions = () => {
  const [lastDays, setLastDays] = useState(7);
  const [page, setPage] = useState(1);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const { loading: loadingCategories, data: categories } = useQuery(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [category, setCategory] = useState(null);

  const [budget, setBudget] = useState(null);
  const { loading: loadingBudgets, data: budgets } = useQuery(GET_BUDGETS, {
    fetchPolicy: "cache-and-network",
  });

  const [currency, setCurrency] = useState(null);
  const { loading: loadingCurrencies, data: currencies } = useQuery(
    GET_CURRENCIES,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const handleSetDateFrom = (date) => {
    setDateFrom(date);
    setLastDays(null);
  };
  const handleSetDateTo = (date) => {
    setDateTo(date);
    setLastDays(null);
  };

  const { loading, data } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: "cache-and-network",
    variables: {
      first: 10,
      offset: (page - 1) * 10,
      lastDaysRange: lastDays ? lastDays : null,
      categoryId: category ? category : null,
      budgetId: budget ? budget : null,
      currencyId: currency ? currency : null,
      dateFrom: dateFrom ? dateFrom : null,
      dateTo: dateTo ? dateTo : null,
    },
  });

  const [createReport, { loading: loadingReport }] = useMutation(
    CREATE_REPORT,
    {
      variables: {
        lastDaysRange: lastDays ? lastDays : null,
        categoryId: category ? category : null,
        budgetId: budget ? budget : null,
        currencyId: currency ? currency : null,
        dateFrom: dateFrom ? dateFrom : null,
        dateTo: dateTo ? dateTo : null,
      },
      onCompleted: (data) => {
        toast.success("Report generated successfully");
        window.open(backendUrl + data.createReport.report.reportUrl);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return (
    <>
      <Col span={24}>
        <Toaster />
        {loading && (
          <Row justify="center">
            <Col>
              <Spin />
            </Col>
          </Row>
        )}
        {!loading && (
          <Row gutter={[20, 20]}>
            <Col span={24} className="d-flex justify-content-start">
              <DatePicker
                onChange={(date) => handleSetDateFrom(date)}
                defaultValue={dateFrom}
                style={{ width: 200 }}
                className="mr-2"
              />
              <DatePicker
                onChange={(date) => handleSetDateTo(date)}
                defaultValue={dateTo}
                style={{ width: 200 }}
                className="mr-2"
              />
              <Select
                defaultValue={lastDays}
                onChange={(value) => setLastDays(value)}
                style={{ width: 120 }}
                disabled={!lastDays}
                className="mr-2"
              >
                <Select.Option value={null}>All time</Select.Option>
                <Select.Option value={7}>Last 7 days</Select.Option>
                <Select.Option value={30}>Last 30 days</Select.Option>
                <Select.Option value={90}>Last 90 days</Select.Option>
              </Select>
              <Select
                defaultValue={category}
                onChange={(value) => setCategory(value)}
                style={{ width: 120 }}
                className="mr-2"
              >
                <Select.Option value={null}>All categories</Select.Option>
                {categories?.categories?.edges?.map((category) => (
                  <Select.Option value={category.node.id}>
                    {category.node.name}
                  </Select.Option>
                ))}
              </Select>
              <Select
                defaultValue={budget}
                onChange={(value) => setBudget(value)}
                style={{ width: 120 }}
                className="mr-2"
              >
                <Select.Option value={null}>All budgets</Select.Option>
                {budgets?.me?.budgets?.edges?.map((budget) => (
                  <Select.Option value={budget.node.budget.id}>
                    {budget.node.budget.name}
                  </Select.Option>
                ))}
              </Select>
              <Select
                defaultValue={currency}
                onChange={(value) => setCurrency(value)}
                style={{ width: 120 }}
                className="mr-2"
              >
                <Select.Option value={null}>All currencies</Select.Option>
                {currencies?.currencies?.edges?.map((currency) => (
                  <Select.Option value={currency.node.id}>
                    {currency.node.symbol}
                  </Select.Option>
                ))}
              </Select>
              <Button
                onClick={() => {
                  setLastDays(7);
                  setCategory(null);
                  setBudget(null);
                  setCurrency(null);
                  setDateFrom(null);
                  setDateTo(null);
                }}
                icon={<ReloadOutlined />}
              ></Button>
              <div className="ml-auto">
                <Button onClick={() => createReport()} loading={loadingReport}>
                  Generate report
                </Button>
              </div>
            </Col>
            <Col span={24}>
              <Card>
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: "",
                      dataIndex: "category_avatar",
                      key: "category_avatar",
                      render: (text, record) => (
                        <div className="d-flex align-items-center">
                          <Avatar
                            className="font-size-sm"
                            style={{ backgroundColor: COLOR_2 }}
                            src={`${backendUrl}${text}`}
                          ></Avatar>
                        </div>
                      ),
                    },
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category_name",
                      key: "category_name",
                    },
                    {
                      title: "Amount",
                      dataIndex: "amount",
                      key: "amount",
                    },
                    {
                      title: "Date",
                      dataIndex: "date",
                      key: "date",
                    },
                  ]}
                  dataSource={data?.me?.transactions?.results?.map((item) => ({
                    amount: `${item.currency.symbol}` + " " + `${item.amount}`,
                    currency: `${item.currency.symbol}`,
                    category_name: `${item.category.name}`,
                    category_avatar: `${item.category.avatar}`,
                    name: `${item.name}`,
                    date: `${item.date}`.split("T")[0],
                  }))}
                />
              </Card>
              <div className="d-flex justify-content-center">
                <Pagination
                  className="mt-3"
                  defaultCurrent={page}
                  showSizeChanger={false}
                  onChange={(page) => setPage(page)}
                  pageSize={10}
                  total={data?.me?.transactions?.totalCount || 0}
                />
              </div>
            </Col>
          </Row>
        )}
      </Col>
    </>
  );
};

export default Transactions;
