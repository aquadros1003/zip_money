import React from "react";
import { Card, Progress } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import PIN_BUDGET from "../api/mutations/PinBudget";
import { Spin } from "antd";
import backendUrl from "../configs/BackendUrl";
import GET_BUDGETS from "../api/queries/GetBudgets";
import { Row } from "antd";
import AvatarImg from "../assets/default-avatar.jpg";
import { Avatar } from "antd";
import { Dropdown } from "antd";
import { Menu } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { PrinterOutlined } from "@ant-design/icons";
import { FileExcelOutlined } from "@ant-design/icons";
import { EllipsisOutlined } from "@ant-design/icons";
import InviteModal from "./InviteModal";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const BudgetCard = ({
  title,
  value,
  size,
  subtitle,
  strokeWidth,
  extra,
  isPinned,
  budgetId,
  avatar,
}) => {
  const [pinBudget, { loading, error }] = useMutation(PIN_BUDGET, {
    variables: { budgetId: budgetId },
    refetchQueries: () => [
      {
        query: GET_BUDGETS,
      },
    ],
  });
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePinBudget = () => {
    pinBudget();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const cardDropdown = (menu) => (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <a className="text-gray font-size-lg" onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );

  const BudgetOption = (
    <Menu>
      <Menu.Item key="0">
        <span>
          <div className="d-flex align-items-center" onClick={handlePinBudget}>
            <PushpinOutlined />
            <span className="ml-2">Pin Budget</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>
          <div className="d-flex align-items-center" onClick={showModal}>
            <SendOutlined />
            <span className="ml-2">Invite</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="12">
        <span>
          <div className="d-flex align-items-center">
            <FileExcelOutlined />
            <span className="ml-2">Details</span>
          </div>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card className="mb-4">
      <div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          iconTheme={{ primary: "#000", secondary: "#fff" }}
        />
      </div>
      <InviteModal
        budgetId={budgetId}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <div className="text-center">
        <Row className="flex align-items-center justify-content-between">
          {avatar ? (
            <Avatar
              src={`${backendUrl}${avatar}`}
              size={40}
              className="float-left"
            />
          ) : (
            <Avatar src={AvatarImg} size={40} className="float-left" />
          )}
          {title && <h4 className="font-weight-bold">{title}</h4>}
          <div className="float-right">{cardDropdown(BudgetOption)}</div>
        </Row>
        <Progress
          type="dashboard"
          percent={value}
          width={size}
          strokeWidth={strokeWidth}
          className="mt-1"
          success={{ percent: -1000000 }}
        />
        <div
          className={`mt-2 mx-auto text-muted ${extra ? "mb-2" : ""}`}
          style={{ maxWidth: `${size + 30}px` }}
        >
          {subtitle}
        </div>
        {extra}
      </div>
    </Card>
  );
};

BudgetCard.defaultProps = {
  strokeWidth: 4,
  size: 150,
};

export default BudgetCard;
