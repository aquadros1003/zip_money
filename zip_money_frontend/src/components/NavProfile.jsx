import React from "react";
import { Menu, Dropdown, Avatar, Row } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "../components/Icon";
import AvatarImg from "../assets/default-avatar.jpg";
import { useMutation } from "@apollo/client";
import SIGN_OUT from "../api/mutations/SignOut";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import ME from "../api/queries/Me";
import { useQuery } from "@apollo/client";
import backendUrl from "../configs/BackendUrl";
import { Button, Modal } from "antd";
import { useState } from "react";
import { Form, Input, DatePicker } from "antd";
import GET_CATEGORIES from "../api/queries/GetCategories";
import GET_CURRENCIES from "../api/queries/GetCurrencies";
import { Select } from "antd";
import { Col } from "antd";
import GET_BUDGETS from "../api/queries/GetBudgets";
import CREATE_TRANSACTION from "../api/mutations/CreateTransactions";
import GET_EXPENSES from "../api/queries/GetMonthlyExpenses";
import GET_MONTHLY_CHART_DATA from "../api/queries/GetMonthlyChartData";
import GET_TRANSACTIONS from "../api/queries/GetTransactions";
import GET_PINNED_BUDGET from "../api/queries/GetPinnedBudget";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/dashboard/update-profile",
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  const navigate = useNavigate();
  const [SignOut, { loading }] = useMutation(SIGN_OUT);
  const [CreateTransaction, { loading: loadingCreateTransaction }] =
    useMutation(CREATE_TRANSACTION, {
      refetchQueries: () => [
        {
          query: GET_TRANSACTIONS,
        },
        {
          query: GET_EXPENSES,
        },
        {
          query: GET_MONTHLY_CHART_DATA,
        },
        {
          query: GET_PINNED_BUDGET,
        },
      ],
      onCompleted: () => {
        setModal2Open(false);
        // clear form
      },
    });

  const [canSetCurrency, setCanSetCurrency] = useState(true);
  const [budgetCurrency, setBudgetCurrency] = useState("");

  const { data, refetch } = useQuery(ME);
  const [modal2Open, setModal2Open] = useState(false);
  const handleSignOut = () => {
    SignOut();
    {
      loading && <Spin />;
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);

  const { data: dataCurrencies } = useQuery(GET_CURRENCIES);

  const { data: dataBudgets } = useQuery(GET_BUDGETS);

  if (loadingCategories) return <Spin />;

  if (errorCategories) return `Error! ${errorCategories.message}`;

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header"></div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <Icon className="mr-3" type={el.icon} />
                <span className="font-weight-normal">{el.title}</span>
                <Link to={el.path} />
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={handleSignOut}>
            {loading && <Spin />}
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">
                Sign Out{loading && <Spin />}
              </span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );

  return (
    <>
      <Button
        className="mr-5"
        type="primary"
        onClick={() => setModal2Open(true)}
      >
        Add Transaction
      </Button>
      <Modal
        title="Add Transaction"
        centered
        open={modal2Open}
        footer={null}
        onCancel={() => setModal2Open(false)}
        width={1000}
      >
        <Form
          name="basic"
          initialValues={{}}
          layout="vertical"
          onFinishFailed={() => setModal2Open(false)}
          autoComplete="off"
          onFinish={(values) => {
            CreateTransaction({
              variables: {
                name: values.name,
                amount: values.amount,
                currencyId: values.currency,
                categoryId: values.category,
                budgetId: values.budget,
              },
            });
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: false, message: "Please input your budget!" }]}
          >
            <Select
              placeholder="Select a budget"
              onChange={(value) => {
                const budget = dataBudgets?.me?.budgets?.edges?.find(
                  (budget) => budget.node.budget.id === value
                );
                if (budget) {
                  setCanSetCurrency(false);
                  setBudgetCurrency(budget.node.budget.currency.symbol);
                } else {
                  setCanSetCurrency(true);
                }
              }}
            >
              <Select.Option value={null}></Select.Option>
              {dataBudgets?.me?.budgets?.edges?.map((budget) => (
                <Select.Option value={budget.node.budget.id}>
                  {budget.node.budget.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Row>
            <Col span={20}>
              <Form.Item label="Amount" name="amount" className="mr-2">
                <Input
                  type="number"
                  className="ant-input"
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Currency"
                name="currency"
                rules={[
                  { required: false, message: "Please input your currency!" },
                ]}
              >
                <Select
                  placeholder={
                    canSetCurrency ? "Select a currency" : budgetCurrency
                  }
                  disabled={!canSetCurrency}
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
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input your category!" }]}
          >
            <Select placeholder="Select a category">
              {dataCategories?.categories?.edges?.map((category) => (
                <Select.Option value={category.node.id}>
                  {category.node.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingCreateTransaction}
              block
            >
              Add Transaction
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Dropdown
        placement="bottomRight"
        overlay={profileMenu}
        trigger={["click"]}
      >
        <Menu className="d-flex align-item-center" mode="horizontal">
          <Menu.Item key="profile">
            <Avatar
              size={45}
              src={data?.me?.avatar ? backendUrl + data?.me?.avatar : AvatarImg}
            />
          </Menu.Item>
        </Menu>
      </Dropdown>
    </>
  );
};

export default NavProfile;
