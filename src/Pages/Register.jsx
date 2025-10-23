import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
  Row,
  Col,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import icon from "/icon.png";
import wave from "../assets/waves.svg";
import PhoneInput from "antd-phone-input";
import "../index.css";

// ✅ Firebase imports
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const { Text, Link } = Typography;

const Register = ({ onRegisterSuccess }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 🔹 Validation function for phone number
  const phoneValidator = (_, value) => {
    if (value && typeof value.valid === "function" && value.valid()) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Invalid phone number"));
  };

  const onFinish = async (values) => {
    try {
      const { email, password, name, phone } = values;
      const phoneNumber =
        typeof phone === "object"
          ? `+${phone.countryCode}${phone.areaCode || ""}${phone.phoneNumber}`
          : phone || "";

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const timestamp = new Date().toISOString();
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        name,
        email,
        phone: phoneNumber, // ✅ store as a plain string
        role: "client",
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      message.success("Registration successful!");
      localStorage.setItem("sessionUser", name);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message.error(
          "This email is already registered. Please log in instead."
        );
      } else if (error.code === "auth/invalid-email") {
        message.error("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        message.error("Password must be at least 6 characters.");
      } else {
        message.error("Registration failed. Please try again.");
      }
      console.error("Registration error:", error);
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
          width: 720,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <img
            src={icon}
            alt="App Logo"
            style={{
              width: 120,
              height: 120,
              objectFit: "contain",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>

        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={24}>
            {/* Left column */}
            <Col span={12}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  { validator: phoneValidator }, // ✅ custom validation
                ]}
              >
                <PhoneInput
                  enableSearch
                  className="custom-phone-input"
                  placeholder="Phone Number"
                />
              </Form.Item>
            </Col>

            {/* Right column */}
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "Enter a valid email!" },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="E-mail" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the{" "}
                  <a
                    href="#"
                    style={{ color: "#90E0EF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ADE8F4")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#90E0EF")
                    }
                  >
                    terms and conditions
                  </a>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center", marginTop: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: 6 }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Text>
            Part of the crew?{" "}
            <Link
              onClick={() => navigate("/login")}
              style={{ color: "#90E0EF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ADE8F4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#90E0EF")}
            >
              Login
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Register;
