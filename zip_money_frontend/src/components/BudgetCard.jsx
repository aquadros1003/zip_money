import React from "react";
import { Card, Progress } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import PIN_BUDGET from "../api/mutations/PinBudget";
import { Spin } from "antd";
import backendUrl from "../configs/BackendUrl";
import GET_BUDGETS from "../api/queries/GetBudgets";
import { Row } from "antd";

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
    refetchQueries: () => [{ query: GET_BUDGETS }],
  });
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;

  const handlePinBudget = () => {
    pinBudget();
  };

  return (
    <Card className="mb-4">
      <div className="text-center">
        <Row className="flex align-items-center justify-content-between">
          {avatar && (
            <div className="mb-3">
              <img
                className="rounded-circle"
                src={`${backendUrl}${avatar}`}
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
          )}
          {title && <h4 className="font-weight-bold">{title}</h4>}
          {!isPinned && (
            <div className="float-right">
              <PushpinOutlined
                style={{ fontSize: "20px" }}
                onClick={handlePinBudget}
              />
            </div>
          )}
          {isPinned && (
            <div className="float-right disabled">
              <PushpinOutlined
                style={{ fontSize: "20px" }}
                onClick={handlePinBudget}
                hidden
              />{" "}
            </div>
          )}
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
