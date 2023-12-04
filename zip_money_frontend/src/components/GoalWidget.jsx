import React from "react";
import PropTypes from "prop-types";
import { Card, Progress } from "antd";

export const GoalWidget = ({
  title,
  value,
  size,
  subtitle,
  strokeWidth,
  extra,
}) => {
  return (
    <Card className="mb-4">
      <div className="text-center">
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

GoalWidget.defaultProps = {
  strokeWidth: 4,
  size: 150,
};

export default GoalWidget;
