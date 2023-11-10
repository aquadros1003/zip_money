import React from "react";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  MehOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import { motion } from "framer-motion";
import SIGN_UP from "../api/mutations/SignUp";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const rules = {
  first_name: [
    {
      required: true,
      message: "Please input your first name",
    },
    {
      min: 3,
      message: "First name must be at least 3 characters",
    }
  ],
  last_name: [
    {
      required: true,
      message: "Please input your last name",
    },
    {
      min: 3,
      message: "Last name must be at least 3 characters",
    }
  ],
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
    {
      min: 8,
      message: "Password must be at least 8 characters",
    },
    {
      max: 20,
      message: "Password must be at most 20 characters",
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    }
  ],
  confirm: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  const message = error ? error.message : data ? "Register Successfull" : "";
  const showMessage = error || data ? true : false;

  if (data) {
    navigate("/login");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={(values) => {
          signUp({
            variables: {
              email: values.email,
              password: values.password,
              confirmPassword: values.confirm,
              firstName: values.first_name,
              lastName: values.last_name
            },
          });
        }}
      >
        <Form.Item name="first_name" rules={rules.first_name}hasFeedback>
          <Input
            prefix={<MehOutlined className="text-primary" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item name="last_name" rules={rules.last_name}hasFeedback>
          <Input
            prefix={<MehOutlined className="text-primary" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item name="email" rules={rules.email} hasFeedback>
          <Input
            prefix={<MailOutlined className="text-primary" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={rules.password} hasFeedback>
          <Input.Password
            prefix={<LockOutlined className="text-primary" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="confirm" rules={rules.confirm} hasFeedback>
          <Input.Password
            prefix={<LockOutlined className="text-primary" />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
