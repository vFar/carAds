import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Card, message, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import icon from "/icon.png";
import wave from "../assets/waves.svg";
import { Image } from "antd";

const { Title } = Typography;

const users = {
  admin: "admin",
  client: "client",
};

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("sessionUser");
    if (savedUser) {
      message.success(`Welcome back, ${savedUser}!`);
      onLoginSuccess(savedUser);
      navigate("/dashboard");
    }
  }, [navigate, onLoginSuccess]);

  const onFinish = (values) => {
    const { username, password, remember } = values;

    if (users[username] && users[username] === password) {
      message.success(
        `Login successful! Remember me: ${remember ? "Yes" : "No"}`
      );

      if (remember) {
        localStorage.setItem("sessionUser", username);
      } else {
        localStorage.removeItem("sessionUser");
      }

      onLoginSuccess(username);
      navigate("/dashboard");
    } else {
      message.error("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start", // move card to left
        alignItems: "center", // keep centered vertically
        position: "relative",
        overflow: "hidden",
        paddingLeft: "10%" // acts like margin-left
      }}
    >
      <img
        src={wave}
        alt="Background Wave"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Card
        style={{
          width: 360,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
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

        {/* form remains unchanged */}
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: false }}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ borderRadius: 6 }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
