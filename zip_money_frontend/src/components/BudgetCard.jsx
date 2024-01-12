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
import BudgetDetails from "./BudgetDetails";

export const BudgetCard = ({
  title,
  value,
  size,
  subtitle,
  strokeWidth,
  extra,
  budgetId,
  avatar,
  isOwner,
  budget,
  isPinned,
}) => {
  console.log("budget", isPinned);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [pinBudget, { data, loading, error }] = useMutation(PIN_BUDGET, {
    onCompleted: () => {
      toast.success("Budget pinned successfully", {
        duration: 4000,
        position: "bottom-right",
        style: {
          border: "1px solid #fff",
          padding: "20px",
          fontSize: "1rem",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#0000ff",
        },
      });
    },
    refetchQueries: [
      {
        query: GET_BUDGETS,
      },
    ],
  });

  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;

  const handlePinBudget = (budgetId) => {
    pinBudget({
      variables: {
        budgetId: budgetId,
      },
      refetchQueries: [
        {
          query: GET_BUDGETS,
        },
      ],
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const ShowDetailsModal = () => {
    setIsDetailsModalVisible(true);
  };

  const cardDropdown = (menu) => (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <a className="text-gray font-size-lg" onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
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
      <BudgetDetails
        budget={budget}
        isDetailsModalVisible={isDetailsModalVisible}
        setIsDetailsModalVisible={setIsDetailsModalVisible}
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
          <div className="float-right">
            {cardDropdown(
              <Menu>
                <Menu.Item
                  key="0"
                  onClick={() => handlePinBudget(budgetId)}
                  disabled={isPinned}
                >
                  <span>
                    <div className="d-flex align-items-center">
                      <PushpinOutlined
                        style={{ color: isPinned ? "#fadb14" : "" }}
                      />
                      <span className="ml-2">Pin Budget</span>
                    </div>
                  </span>
                </Menu.Item>
                {isOwner && (
                  <Menu.Item key="1">
                    <span>
                      <div
                        className="d-flex align-items-center"
                        onClick={showModal}
                      >
                        <SendOutlined />
                        <span className="ml-2">Invite</span>
                      </div>
                    </span>
                  </Menu.Item>
                )}
                <Menu.Item key="2">
                  <span>
                    <div
                      className="d-flex align-items-center"
                      onClick={() => ShowDetailsModal(true)}
                    >
                      <FileExcelOutlined />
                      <span className="ml-2">Details</span>
                    </div>
                  </span>
                </Menu.Item>
              </Menu>
            )}
          </div>
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
