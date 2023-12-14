import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import NavProfile from "./NavProfile";
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
      <div className="d-flex align-items-center">
        {!isMobile && (
          <div className="app-header-logo-mobile">
            <a>
              <img
                src={Logo}
                alt="Zip Money"
                width={50}
                height={50}
                className="mr-2"
              />
            </a>{" "}
            <span className="font-weight-bold" style={{ fontSize: "18px" }}>
              Zip Money
            </span>
          </div>
        )}
        <div className="ml-auto d-flex align-items-center">
          <NavProfile />
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
