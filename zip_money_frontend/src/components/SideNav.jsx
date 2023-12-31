import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const items2 = [
  {
    key: "1",
    icon: <LaptopOutlined />,
    title: "Dashboard",
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <AccountBookOutlined />,
    title: "Transactions",
    path: "/dashboard/transactions",
    label: "Transactions",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    title: "User",
    path: "/dashboard/budget",
    label: "Budgets",
  },
  {
    key: "4",
    icon: <NotificationOutlined />,
    title: "Notifications",
    path: "/dashboard/notification",
    label: "Notifications",
  },
];

export const SideNav = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      theme="light"
      style={{
        height: "100%",
      }}
    >
      {items2.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
          <Link to={item.path} />
        </Menu.Item>
      ))}
    </Menu>
  );
};
