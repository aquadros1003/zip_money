import React, { Component } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import { DIR_RTL } from "../constants/ThemeConstant";
import AvatarImg from "../assets/avatar.jpg";
export class NavPanel extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item key="panel" onClick={this.showDrawer}>
            <a href={void 0}>
              <SettingOutlined className="nav-icon mr-0" />
            </a>
          </Menu.Item>
        </Menu>
        <Drawer
          title="Theme Config"
          placement={this.props.direction === DIR_RTL ? "left" : "right"}
          width={350}
          onClose={this.onClose}
        ></Drawer>
      </>
    );
  }
}

export default NavPanel;
