import React, { useEffect, useState } from "react";
import { Layout, Typography, Button, Card, Row, Col, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../Components/SidebarMenu";
import { db } from "../firebase"; // 🔥 Import Firestore
import { doc, getDoc } from "firebase/firestore"; // 🔥 Firestore utils

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const ClientDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    // Fetch user's name from Firestore
    const fetchUserData = async () => {
      try {
        if (user?.uid) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setDisplayName(userSnap.data().name || "User");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    onLogout();
    message.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <SidebarMenu handleLogout={handleLogout} />

      {/* Main Layout */}
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Welcome, {displayName}
          </Title>
        </Header>

        {/* Dashboard Content */}
        <Content style={{ height: "calc(100vh - 64px - 70px)" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Title level={3}>Your Dashboard</Title>
            <Paragraph>
              Manage your car advertisements, post new ads, and track
              performance.
            </Paragraph>

            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  title="My Active Ads"
                  bordered={false}
                  style={{ borderRadius: 10 }}
                >
                  <p>You currently have 3 active car ads.</p>
                  <Button type="link">View Listings →</Button>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  title="New Ad"
                  bordered={false}
                  style={{ borderRadius: 10 }}
                >
                  <p>Ready to post a new car for sale?</p>
                  <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => navigate("/post-ad")}
                  >
                    Post Now
                  </Button>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  title="Account Settings"
                  bordered={false}
                  style={{ borderRadius: 10 }}
                >
                  <p>Update your profile, password, and preferences.</p>
                  <Button type="default" onClick={() => navigate("/profile")}>
                    Manage Profile
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center", flexShrink: 0 }}>
          © {new Date().getFullYear()} Car Advertisements — Drive Your Dream
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ClientDashboard;
