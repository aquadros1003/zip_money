import React from "react";
import { Card, Progress, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const CreateBudget = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/dashboard/create-budget", { replace: true });
  };
  return (
    <div className="border-0 text-center">
      <Button
        shape="circle"
        icon={<PlusOutlined style={{ fontSize: "24px" }} />}
        className="width-100 height-100"
        size="large"
        onClick={onClick}
      />
    </div>
  );
};

export default CreateBudget;
