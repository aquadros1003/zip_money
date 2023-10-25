import React from "react";
import { Route } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';
import { ConfigProvider } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from '../configs/AppConfig'


export const Views = (props) => {
  return (
    <ConfigProvider>
      <Route path={`${APP_PREFIX_PATH}`} component={AuthLayout} />
      <Route path={`${AUTH_PREFIX_PATH}`} component={AuthLayout} />
    </ConfigProvider>
  )
}

export default Views;

