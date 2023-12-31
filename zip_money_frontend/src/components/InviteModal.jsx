import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import { Form, Input, DatePicker } from "antd";
import INVITE_USER from "../api/mutations/InviteUser";
import { useMutation } from "@apollo/client";
import { Button } from "antd";
import { toast, Toaster } from "react-hot-toast";

export const InviteModal = (budgetId, modal2Open, setModal2Open) => {
  const [email, setEmail] = useState("");
  const [InviteUser, { loading }] = useMutation(INVITE_USER, {
    onCompleted: () => {
      toast.success("User invited successfully", {
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
  });
  const handleInviteUser = () => {
    InviteUser(
      {
        variables: {
          email: email,
          budgetId: budgetId.budgetId,
        },
      },
      {
        refetchQueries: () => [
          {
            query: GET_BUDGETS,
          },
        ],
      }
    );
  };
  return (
    <Modal
      title="Invite User to Budget"
      centered
      visible={budgetId.isModalVisible}
      footer={null}
      onCancel={() => budgetId.setIsModalVisible(false)}
      width={600}
    >
      <Form
        name="basic"
        initialValues={{}}
        layout="vertical"
        onFinishFailed={() => budgetId.setIsModalVisible(false)}
        autoComplete="off"
        onFinish={(values) => {
          handleInviteUser();
          budgetId.setIsModalVisible(false);
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Invite
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteModal;
