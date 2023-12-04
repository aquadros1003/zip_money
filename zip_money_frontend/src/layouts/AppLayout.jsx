import HeaderNav from "../components/HeaderNav";
import { SideNav } from "../components/SideNav";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import { useQuery } from "@apollo/client";
import ME from "../api/queries/Me";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

export const AppLayout = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery(ME);
  if (data?.me === undefined) {
    navigate("/login");
  }


  console.log(data?.me);

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          backgroundColor: "white",
        }}
      >
        <HeaderNav />
      </Header>
      <Layout>
        <Sider width={200} collapsible theme="light">
          <SideNav />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
