import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Avatar, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import NavProfile from "./NavProfile";
import NavPanel from "../components/NavPanel";
import Logo from "../assets/logo.png";

const { Header } = Layout;

export const HeaderNav = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavTop, setIsNavTop] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [headerNavColor, setHeaderNavColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      const ismobile = width < 992;
      setIsMobile(ismobile);
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.remove("layout-top-nav");
      setIsNavTop(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isNavTop) {
      document.body.classList.add("layout-top-nav");
    } else {
      document.body.classList.remove("layout-top-nav");
    }
  }, [isNavTop]);

  const onToggle = () => {
    setNavCollapsed(!navCollapsed);
  };

  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    return navCollapsed ? "80px" : "256px";
  };

  return (
    <Header
      className={`app-header`}
      style={{
        backgroundColor: headerNavColor,
        left: `${getNavWidth()}`,
      }}
    >
      <div className="d-flex">
        {isMobile && (
          <div className="d-block d-lg-none pointer mr-3" onClick={onToggle}>
            {navCollapsed ? (
              <MenuUnfoldOutlined className="nav-icon" />
            ) : (
              <MenuFoldOutlined className="nav-icon" />
            )}
          </div>
        )}
        <Avatar src={Logo} alt="ZipMoney" size={80} />
        <div className="ml-auto d-flex header-right-icons header-search-icon">
          <NavProfile />
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
