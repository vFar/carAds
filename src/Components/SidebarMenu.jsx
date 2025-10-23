import React from "react";
import { Layout, Menu, Divider, Image, Typography } from "antd";
import {
  CarOutlined,
  DashboardOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import icon from "/icon.png";

const { Sider } = Layout;
const { Text } = Typography;

const SidebarMenu = ({ handleLogout }) => {
  const navigate = useNavigate();

  // Define color palette
  const colors = {
    sidebarBg: "#90E0EF",       // sidebar background
    menuText: "#FFF",        // menu text & icon
    menuHover: "#00B4D8",       // hover & selected
    logoutText: "#ff4d4f",      // logout button color
    divider: "rgba(0,0,0,0.1)", // divider color
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        background: colors.sidebarBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top section (Logo + Menu) */}
      <div>
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            borderBottom: `1px solid ${colors.divider}`,
          }}
        >
          <Image
            src={icon}
            alt="App Logo"
            preview={false}
            draggable={false}
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            background: colors.sidebarBg,
            color: colors.menuText,
          }}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined style={{ color: colors.menuText }} />,
              label: "Dashboard",
              onClick: () => navigate("/dashboard"),
            },
            {
              key: "2",
              icon: <CarOutlined style={{ color: colors.menuText }} />,
              label: "My Listings",
              onClick: () => navigate("/my-listings"),
            },
            {
              key: "3",
              icon: <PlusCircleOutlined style={{ color: colors.menuText }} />,
              label: "New listing ",
              onClick: () => navigate("/post-ad"),
            },
            {
              key: "4",
              icon: <UserOutlined style={{ color: colors.menuText }} />,
              label: "Profile",
              onClick: () => navigate("/profile"),
            },
          ]}
        />
      </div>

      {/* Bottom section (Divider + Logout) */}
      <div style={{ marginTop: "auto", paddingBottom: 20 }}>
        <Divider style={{ margin: "8px 0", borderColor: colors.divider }} />
        <Menu
          theme="light"
          mode="inline"
          selectable={false}
          style={{ background: colors.sidebarBg }}
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined style={{ color: colors.logoutText }} />,
              label: <span style={{ color: colors.logoutText }}>Logout</span>,
              onClick: handleLogout,
            },
          ]}
        />
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Text style={{ fontSize: 12, color: colors.menuText }}>
            © 2025 CarAdz
          </Text>
        </div>
      </div>
    </Sider>
  );
};

export default SidebarMenu;
