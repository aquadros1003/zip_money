import React from "react";
import { Button, Form, Input, Divider, Alert, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import SIGN_IN from "../api/mutations/SignIn";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import SOCIAL_AUTH from "../api/mutations/SocialAuth";

export const LoginForm = (props) => {
  const { otherSignIn, showForgetPassword, onForgetPasswordClick, extra } =
    props;
  const navigate = useNavigate();
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN, {
    onCompleted: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const [SocialAuth,] = useMutation(SOCIAL_AUTH, {
    onCompleted: () => {
      navigate("/dashboard", { replace: true });
    }
  });


  const initialCredential = {
    email: "presentation@dev.pl",
    password: "Polak!23",
  };

  const message = error ? error.message : data ? "Login Successfull" : "";
  const showMessage = error || data ? true : false;

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          or connect with
        </span>
      </Divider>
      <div className="d-flex justify-content-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            SocialAuth({
              variables: {clientId: credentialResponse.clientId, credentials: credentialResponse.credential},
            });
          }}
        />
      </div>
    </div>
  );

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
        layout="vertical"
        name="login-form"
        initialValues={initialCredential}
        onFinish={(values) => {
          signIn({
            variables: { email: values.email, password: values.password },
          });
        }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>Password</span>
              {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Forget Password?
                </span>
              )}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
        {otherSignIn ? renderOtherSignIn : null}
        {extra}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

export default LoginForm;
