import React from 'react';
import { Button, Layout, Typography, theme } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const App = () => {
  const { token } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: token.colorBgContainer,
      }}
    >
      <Header
        style={{
          background: token.colorPrimary,
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
        }}
      >
        nigger
      </Header>
      <Content style={{ padding: 24 }}>
        <Title level={2}>Welcome!</Title>
        <Paragraph>
          This is a new React project using <b>Ant Design</b>.
        </Paragraph>
        <Button type="primary">Click Me</Button>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} My Ant Design App
      </Footer>
    </Layout>
  );
};

export default App;
