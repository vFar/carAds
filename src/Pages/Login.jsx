import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
  Checkbox,
  Image,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import icon from "/icon.png";
import wave from "../assets/waves.svg";

const { Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // optional: get user name from Firestore
        const snap = await getDoc(doc(db, "users", user.uid));
        const name = snap.exists() ? snap.data().name : user.email;

        message.success(`Welcome back, ${name}!`);
        localStorage.setItem("sessionUser", name);
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const onFinish = async (values) => {
    const { username, password, remember } = values;

    try {
      // Firebase login with email & password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;

      // Get display name from Firestore
      const snap = await getDoc(doc(db, "users", user.uid));
      const name = snap.exists() ? snap.data().name : user.email;

      message.success(`Welcome, ${name}!`);
      if (remember) localStorage.setItem("sessionUser", name);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        message.error("No account found with that email.");
      } else if (error.code === "auth/wrong-password") {
        message.error("Incorrect password.");
      } else {
        message.error("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingLeft: "10%",
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

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: false }}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Text>
            New here?{" "}
            <Typography.Link
              onClick={() => navigate("/register")}
              style={{ color: "#90E0EF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ADE8F4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#90E0EF")}
            >
              Register
            </Typography.Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
