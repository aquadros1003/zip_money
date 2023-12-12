import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "../components/Icon";
import AvatarImg from "../assets/avatar.jpg";
import { useMutation } from "@apollo/client";
import SIGN_OUT from "../api/mutations/SignOut";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import ME from "../api/queries/Me";
import { useQuery } from "@apollo/client";
import backendUrl from "../configs/BackendUrl";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/dashboard/update-profile",
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  const navigate = useNavigate();
  const [SignOut, { loading }] = useMutation(SIGN_OUT);

  const { data, refetch } = useQuery(ME);

  const handleSignOut = () => {
    SignOut();
    {
      loading && <Spin />;
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header"></div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <Icon className="mr-3" type={el.icon} />
                <span className="font-weight-normal">{el.title}</span>
                <Link to={el.path} />
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={handleSignOut}>
            {loading && <Spin />}
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">
                Sign Out{loading && <Spin />}
              </span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar size={45} src={`${backendUrl}${data?.me?.avatar}`} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavProfile;
