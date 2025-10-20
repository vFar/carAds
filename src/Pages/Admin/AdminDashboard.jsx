// src/pages/Dashboard.jsx
import React from "react";
import { Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#1677ff",
          color: "white",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Dashboard
      </Header>
      <Content
        style={{
          padding: 24,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title level={2}>Welcome, Admin 🎉</Title>
        <Paragraph>You have successfully logged in.</Paragraph>
        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </Content>
    </Layout>
  );
};

export default Dashboard;
