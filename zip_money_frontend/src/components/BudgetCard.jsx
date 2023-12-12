import React from "react";
import { Card, Progress } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import PIN_BUDGET from "../api/mutations/PinBudget";
import { Spin } from "antd";
import backendUrl from "../configs/BackendUrl";

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
  const [pinBudget, { data, loading, error }] = useMutation(PIN_BUDGET, {
    variables: { budgetId: budgetId },
  });
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;

  const handlePinBudget = () => {
    pinBudget();
  };

  return (
    <Card className="mb-4">
      <div className="text-center">
        {avatar && (
          <div className="float-left">
            <img
              className="rounded-circle"
              src={`${backendUrl}${avatar}`}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
        )}
        {!isPinned && (
          <div className="float-right">
            <PushpinOutlined
              style={{ fontSize: "20px" }}
              onClick={handlePinBudget}
            />{" "}
          </div>
        )}
        {title && <h4 className="mb-3 font-weight-bold">{title}</h4>}
        <Progress
          type="dashboard"
          percent={value}
          width={size}
          strokeWidth={strokeWidth}
          className="mt-1"
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
