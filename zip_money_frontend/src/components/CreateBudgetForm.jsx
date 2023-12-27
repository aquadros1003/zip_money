import React from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Row, Col, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import CREATE_BUDGET from "../api/mutations/CreateBudget";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import GET_CURRENCIES from "../api/queries/GetCurrencies";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import GET_BUDGETS from "../api/queries/GetBudgets";

export const CreateBudgetForm = () => {
  const navigate = useNavigate();
  const { data: dataCurrencies } = useQuery(GET_CURRENCIES);
  const [CreateBudget, { loading }] = useMutation(CREATE_BUDGET, {
    onError: (error) => {
      toast.error(error.message, {
        duration: 4000,
        position: "bottom-right",
        style: {
          border: "1px solid #fff",
          padding: "20px",
          fontSize: "1rem",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff0000",
        },
      });
    },
    onCompleted: () => {
      navigate("/dashboard/budget", { replace: true });
    },
    refetchQueries: () => [{ query: GET_BUDGETS }],
  });

  const onFinish = (values) => {
    CreateBudget({
      variables: {
        name: values.name,
        amount: values.amount,
        currencyId: values.currency,
        endDate: values.endDate,
        description: values.description,
      },
    });
  };

  return (
    <div class="d-flex justify-content-center">
      <Card className="text-center" style={{ width: "80%" }}>
        <Form onFinish={onFinish}>
          <div>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              iconTheme={{ primary: "#000", secondary: "#fff" }}
            />
          </div>
          <Col span={24}>
            <Form.Item
              name="name"
              rules={[{ message: "Please input name of your budget" }]}
            >
              <Input className="update-profile-input" placeholder="Name" />
            </Form.Item>
            <Row>
              <Col span={20}>
                <Form.Item name="amount" className="mr-2">
                  <Input
                    type="number"
                    className="update-profile-input"
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="currency">
                  <Select
                    placeholder="Currency"
                    className="update-profile-input"
                  >
                    {dataCurrencies?.currencies?.edges?.map((currency) => (
                      <Select.Option value={currency.node.id}>
                        {currency.node.symbol}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="description">
              <TextArea
                className="update-profile-input"
                type="textarea"
                placeholder="Description"
                rows={4}
              />
            </Form.Item>
            <Form.Item name="endDate">
              <DatePicker
                className="update-profile-input"
                placeholder="End Date"
              />
            </Form.Item>
          </Col>
          <Row gutter={16} className="justify-content-center">
            <Button
              type="primary"
              htmlType="submit"
              className="update-profile-button"
              loading={loading}
            >
              Create Budget
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateBudgetForm;
